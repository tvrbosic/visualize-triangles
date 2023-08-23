import { useState, useEffect, useReducer, useCallback } from 'react';
import { Box, Button, Center, Flex, Heading, Text } from '@chakra-ui/react';

import {
  ICreateTriangleFormState,
  ECreateTriangleFormActions,
  ICreateTriangleFormActions,
} from 'components/forms/types';
import { ITriangle, EGenerateTriangleMethods } from 'types/common';
import {
  checkSidePresent,
  checkThreeValuesOneSide,
  checkOneSideTwoAngles,
  checkTwoSidesOneAngle,
  checkThreeSides,
  checkGeneratedTriangle,
} from 'utils/validations';
import { Triangle } from 'classes/Triangle';

import CreateTriangleFormHeading from 'components/forms/CreateTriangleFormHeading';
import LabelInput from 'components/forms/LabelInput';

function reducer(state: ICreateTriangleFormState, action: ICreateTriangleFormActions) {
  switch (action.type) {
    case ECreateTriangleFormActions.SET_NAME:
      return { ...state, name: action.payload };
    case ECreateTriangleFormActions.SET_SIDE_A:
      return { ...state, sideA: action.payload };
    case ECreateTriangleFormActions.SET_SIDE_B:
      return { ...state, sideB: action.payload };
    case ECreateTriangleFormActions.SET_SIDE_C:
      return { ...state, sideC: action.payload };
    case ECreateTriangleFormActions.SET_ANGLE_A:
      return { ...state, angleA: action.payload };
    case ECreateTriangleFormActions.SET_ANGLE_B:
      return { ...state, angleB: action.payload };
    case ECreateTriangleFormActions.SET_ANGLE_C:
      return { ...state, angleC: action.payload };
    case ECreateTriangleFormActions.SET_PERIMETER:
      return { ...state, perimeter: action.payload };
    case ECreateTriangleFormActions.SET_AREA:
      return { ...state, area: action.payload };
    case ECreateTriangleFormActions.SET_TYPE_BY_SIDES:
      return { ...state, typeBySides: action.payload };
    case ECreateTriangleFormActions.SET_TYPE_BY_ANGLES:
      return { ...state, typeByAngles: action.payload };
    default:
      return state;
  }
}

const initialState: ICreateTriangleFormState = {
  name: '',
  sideA: '',
  sideB: '',
  sideC: '',
  angleA: '',
  angleB: '',
  angleC: '',
  perimeter: '',
  area: '',
  typeBySides: '',
  typeByAngles: '',
};

function CreateTriangleForm() {
  const [formState, dispatch] = useReducer(reducer, initialState);
  const [triangle, setTriangle] = useState<ITriangle | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [displayError, setDisplayError] = useState<boolean>(false);

  const validateInputsAndGenerate = useCallback((formTriangleData: ICreateTriangleFormState) => {
    // Hide previous errors
    setDisplayError(false);

    // ### Validate
    if (!formTriangleData.name) {
      setErrorMessage('Please enter name!');
      setTriangle(undefined);
      return;
    }
    if (!checkSidePresent(formTriangleData)) {
      setErrorMessage('Please provide at least one side!');
      setTriangle(undefined);
      return;
    }
    if (!checkThreeValuesOneSide(formTriangleData)) {
      setErrorMessage('Please three values including one side!');
      setTriangle(undefined);
      return;
    }

    // ### Decide which method to use to generate triangle
    if (checkOneSideTwoAngles(formTriangleData)) {
      // Extract side and angles from formTriangleData
      const side = Number(
        [formTriangleData.sideA, formTriangleData.sideB, formTriangleData.sideC].find(
          (side) => side !== ''
        )
      );
      const angles = [
        formTriangleData.angleA,
        formTriangleData.angleB,
        formTriangleData.angleC,
      ].filter((angle) => angle !== '');
      // Generate triangle
      setTriangle(
        new Triangle(Number(angles[0]), Number(angles[1]), side!, EGenerateTriangleMethods.AAS).data
      );
      return;
    }

    if (checkTwoSidesOneAngle(formTriangleData)) {
      // Extract sides and angle from formTriangleData
      const sides = [formTriangleData.sideA, formTriangleData.sideB, formTriangleData.sideC].filter(
        (side) => side !== ''
      );
      const angle = Number(
        [formTriangleData.angleA, formTriangleData.angleB, formTriangleData.angleC].find(
          (angle) => angle !== ''
        )
      );
      // Generate triangle
      setTriangle(
        new Triangle(Number(sides[0]), Number(sides[1]), angle, EGenerateTriangleMethods.SSA).data
      );
      return;
    }

    if (checkThreeSides(formTriangleData)) {
      setTriangle(
        new Triangle(
          Number(formTriangleData.sideA),
          Number(formTriangleData.sideB),
          Number(formTriangleData.sideC),
          EGenerateTriangleMethods.SSS
        ).data
      );
    }

    setErrorMessage(undefined);
    return;
  }, []);

  // ############ Handlers
  const inputChangeHandler = (action: ECreateTriangleFormActions, payload: string) => {
    dispatch({ type: action, payload });
  };

  const saveHandler = () => {
    if (!errorMessage) {
      console.log('Save data');
      // TODO:
      // Save data
      return;
    }

    setDisplayError(true);
  };

  // ############ Effects
  // Validate inputs and generate triangle
  useEffect(() => {
    validateInputsAndGenerate(formState);
  }, [formState, validateInputsAndGenerate]);

  // Check if generated triangle is valid
  useEffect(() => {
    if (triangle && checkGeneratedTriangle(triangle)) {
      setErrorMessage(undefined);
    } else {
      !errorMessage && setErrorMessage('Generated triangle is not valid. Check input data!');
      setTriangle(undefined);
    }
  }, [triangle, errorMessage]);

  // ############ Conditional renders
  const conditionalRender = (key: keyof ITriangle) => {
    if (triangle && triangle[key]) {
      return <Text>{triangle[key]}</Text>;
    }
    return null;
  };

  return (
    <Box flexGrow={1}>
      <CreateTriangleFormHeading />

      <Box mb={4}>
        <LabelInput
          label="Name"
          placeholder="Triangle name"
          onChange={(value: string) =>
            inputChangeHandler(ECreateTriangleFormActions.SET_NAME, value)
          }
        />
      </Box>

      <Flex gap="50px" mb={4}>
        <Box flexShrink={0}>
          <Heading as="h2" size="md" mb={2}>
            Sides
          </Heading>
          <LabelInput
            label="a: "
            placeholder="Side a"
            onChange={(value: string) =>
              inputChangeHandler(ECreateTriangleFormActions.SET_SIDE_A, value)
            }
          />
          <LabelInput
            label="b: "
            placeholder="Side b"
            onChange={(value: string) =>
              inputChangeHandler(ECreateTriangleFormActions.SET_SIDE_B, value)
            }
          />
          <LabelInput
            label="c: "
            placeholder="Side c"
            onChange={(value: string) =>
              inputChangeHandler(ECreateTriangleFormActions.SET_SIDE_C, value)
            }
          />
        </Box>

        <Box flexShrink={0}>
          <Heading as="h2" size="md" mb={2}>
            Angles [°]
          </Heading>
          <LabelInput
            label="A: "
            placeholder="Angle A"
            onChange={(value: string) =>
              inputChangeHandler(ECreateTriangleFormActions.SET_ANGLE_A, value)
            }
          />
          <LabelInput
            label="B: "
            placeholder="Angle B"
            onChange={(value: string) =>
              inputChangeHandler(ECreateTriangleFormActions.SET_ANGLE_B, value)
            }
          />
          <LabelInput
            label="C: "
            placeholder="Angle C"
            onChange={(value: string) =>
              inputChangeHandler(ECreateTriangleFormActions.SET_ANGLE_C, value)
            }
          />
        </Box>

        <Box>
          <Heading as="h2" size="md" mb={2}>
            Calculated
          </Heading>
          <Flex mb={2}>
            <Text fontWeight="bold" mr="10px">
              Perimeter:
            </Text>
            {conditionalRender('perimeter')}
          </Flex>
          <Flex mb={2}>
            <Text fontWeight="bold" mr="10px">
              Area:
            </Text>
            {conditionalRender('area')}
          </Flex>
          <Flex mb={2}>
            <Text fontWeight="bold" mr="10px">
              Type by sides:
            </Text>
            {conditionalRender('typeBySides')}
          </Flex>
          <Flex mb={2}>
            <Text fontWeight="bold" mr="10px">
              Type by angles:
            </Text>
            {conditionalRender('typeByAngles')}
          </Flex>
        </Box>
      </Flex>

      <Center minHeight="27px" mb={4}>
        <Text fontSize="lg" color="crimson">
          {displayError ? errorMessage : null}
        </Text>
      </Center>

      <Box>
        <Button colorScheme="blue" px={10} onClick={saveHandler}>
          Save
        </Button>
      </Box>
    </Box>
  );
}

export default CreateTriangleForm;