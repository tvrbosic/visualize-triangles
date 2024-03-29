import axios, { AxiosInstance } from 'axios';

import { IUserCredentials } from 'types/user';
import { ITriangleObject } from 'types/triangle';
import { IPostLogin, IPostRegister } from 'api/types';

class ApiClient {
  private static instance: ApiClient;

  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  // ########### Auth
  public async postLogin(payload: IUserCredentials): Promise<IPostLogin> {
    const response = await this.axiosInstance.post('/login', { ...payload });
    return response.data;
  }

  public async postRegister(payload: IUserCredentials): Promise<IPostRegister> {
    const response = await this.axiosInstance.post('/register', { ...payload });
    return response.data;
  }

  // ########### Triangles
  public async getTriangles(authorId: number): Promise<ITriangleObject[]> {
    const response = await this.axiosInstance.get(`/triangles?authorId=${authorId}`);
    return response.data;
  }

  public async postTriangle(triangleObject: ITriangleObject): Promise<ITriangleObject> {
    console.log(triangleObject);
    const response = await this.axiosInstance.post('/triangles', triangleObject);
    return response.data;
  }

  public async deleteTriangle(id: number) {
    const response = await this.axiosInstance.delete(`/triangles/${id}`);
    return response.data;
  }
}

export default ApiClient;
