export type TVertex = [number, number];

export enum EGenerateTriangleMethods {
  SSA = 'sidesAndAngle',
  AAS = 'anglesAndSide',
  SSS = 'sides',
}

export enum ETypesBySides {
  EQUILATERAL = 'Equilateral',
  ISOSCELES = 'Isosceles',
  SCALENE = 'Scalene',
  NOT_A_TRIANGLE = 'Not a triangle',
}

export enum ETypesByAngles {
  RIGHT = 'Right',
  OBLIQUE = 'Oblique',
  ACUTE = 'Acute',
  NOT_A_TRIANGLE = 'Not a triangle',
}

export interface ITriangle {
  sides: [number, number, number];
  angles: [number, number, number];
  vertex: [TVertex, TVertex, TVertex];
  perimeter: number;
  area: number;
  typeBySides: ETypesBySides;
  typeByAngles: ETypesByAngles;
}

export interface ITriangleObject {
  id: number;
  name: string;
  dateCreated: string;
  data: ITriangle;
}