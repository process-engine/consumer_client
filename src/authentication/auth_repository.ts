import * as fetch_ponyfill from 'fetch-ponyfill';

import {IAuthenticationRepository, ILoginResult, ILogoutResult} from '../contracts/index';
import {isErrorResult, throwOnErrorResponse} from '../http';

const {fetch, Headers, Request, Response} = fetch_ponyfill();

const HTTP_CODE_OK: number = 200;

export class AuthenticationRepository implements IAuthenticationRepository {

  public config: any;

  public async login(username: string, password: string): Promise<ILoginResult> {
    const options: RequestInit = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };

    const url: string = `${this.config.routes.iam}/login`;
    const response: Response = await fetch(url, options);

    return throwOnErrorResponse<ILoginResult>(response);
  }

  public async logout(): Promise<ILogoutResult> {
    const url: string = `${this.config.routes.iam}/logout`;
    const response: Response = await fetch(url, { method: 'get' });

    return throwOnErrorResponse<ILogoutResult>(response);
  }
}