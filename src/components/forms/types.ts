export interface IGenerateTriangleFormState {
  sideA: string;
  sideB: string;
  sideC: string;
  angleA: string;
  angleB: string;
  angleC: string;
  perimeter: string;
  area: string;
  typeBySides: string;
  typeByAngles: string;
}

export enum EGenerateTriangleFormActions {
  SET_SIDE_A = 'SET_SIDE_A',
  SET_SIDE_B = 'SET_SIDE_B',
  SET_SIDE_C = 'SET_SIDE_C',
  SET_ANGLE_A = 'SET_ANGLE_A',
  SET_ANGLE_B = 'SET_ANGLE_B',
  SET_ANGLE_C = 'SET_ANGLE_C',
  SET_PERIMETER = 'SET_PERIMETER',
  SET_AREA = 'SET_AREA',
  SET_TYPE_BY_SIDES = 'SET_TYPE_BY_SIDES',
  SET_TYPE_BY_ANGLES = 'SET_TYPE_BY_ANGLES',
  RESET_FORM = 'RESET_FORM',
}

export interface IGenerateTriangleFormActions {
  type: EGenerateTriangleFormActions;
  payload: string;
}

export interface ILabeledInput {
  label: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
}
