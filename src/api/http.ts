import {
  ACCOUNT_CONFIRM,
  LOGIN,
  SIGNUP,
  DRIVER_APPLICATION,
  APPROVE_APPLICATION,
  DELETE_APPLICATION,
  UPDATE_USER_FIELD,
  UPDATE_AVATAR,
  S3_KEY_REQUEST,
  GET_ALL_JOURNEYS,
  UPDATE_ADD_USER_JOURNEY
} from '../constants/api-paths';
import { SERVER_HTTPS_URL } from '../../environment/env';
import { HttpResponse } from '../types/http-responses';

export default class HttpAPI {
  public static updateUserJoinsJourney = (
    data: object
  ): Promise<HttpResponse> => HttpAPI.patch(data, UPDATE_ADD_USER_JOURNEY);

  public static getAllJourneys = (userId: string): Promise<HttpResponse> =>
    HttpAPI.get(GET_ALL_JOURNEYS, userId);

  public static confirmAccount = (userId: object): Promise<HttpResponse> =>
    HttpAPI.send(userId, ACCOUNT_CONFIRM);

  public static signUp = (data: object): Promise<HttpResponse> =>
    HttpAPI.send(data, SIGNUP);

  public static login = (data: object): Promise<HttpResponse> =>
    HttpAPI.send(data, LOGIN);

  public static driverApplication = (data: object): Promise<HttpResponse> =>
    HttpAPI.send(data, DRIVER_APPLICATION);

  public static approveApplication = (data: object): Promise<HttpResponse> =>
    HttpAPI.send(data, APPROVE_APPLICATION);

  public static deleteApplication = (data: object): Promise<HttpResponse> =>
    HttpAPI.send(data, DELETE_APPLICATION);

  public static updateUserField = (data: object): Promise<HttpResponse> =>
    HttpAPI.send(data, UPDATE_USER_FIELD);

  public static updateAvatar = (data: object): Promise<HttpResponse> =>
    HttpAPI.send(data, UPDATE_AVATAR);

  public static getS3SecretKey = (): Promise<HttpResponse> =>
    HttpAPI.send({}, S3_KEY_REQUEST);

  private static get = async (
    path: string,
    params?: string
  ): Promise<HttpResponse> => {
    //change this later...
    let url = `${SERVER_HTTPS_URL}${path}`;
    url = params ? `${url}/${params}` : url;

    const res: Response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    });

    const ok: boolean = res.ok;
    const data: HttpResponse = await res.json();
    if (!ok) throw data.error || Error('Unknown Error');
    return data;
  };

  private static send = async (
    req: object,
    path: string
  ): Promise<HttpResponse> => {
    const res: Response = await fetch(`${SERVER_HTTPS_URL}${path}`, {
      method: 'POST',
      body: JSON.stringify(req),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    });

    const ok: boolean = res.ok;
    const data: HttpResponse = await res.json();
    if (!ok) throw data.error || Error('Unknown Error');
    return data;
  };

  private static patch = async (
    req: object,
    path: string
  ): Promise<HttpResponse> => {
    const res: Response = await fetch(`${SERVER_HTTPS_URL}${path}`, {
      method: 'PATCH',
      body: JSON.stringify(req),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    });

    const ok: boolean = res.ok;
    const data: HttpResponse = await res.json();
    if (!ok) throw data.error || Error('Unknown Error');
    return data;
  };
}
