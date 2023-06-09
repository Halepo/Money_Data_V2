import jwtDecode, { JwtPayload } from 'jwt-decode';

import Logger from '@/lib/logger';

import { refresh } from './authApiService';
import { iAuthService } from '../interface/authService';
import { ICachedJWT, ICachedJWTEmpty } from '../interface/authTypes';

export class AuthService implements iAuthService {
  returnAuthHeader() {
    const token = this.getCachedJwtToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    };
    return headers;
  }

  //store Token
  returnAccessTokenAsCachedJwt(response: any) {
    if (response.data.token) {
      Logger.info('Saving access token..');
      this.destroyCachedJwt();
      const expiresAt = new Date(
        jwtDecode<JwtPayload>(response.data.token).exp! * 1000
      );
      //const expiresAt = new Date(Date.now() + expiresIn);
      const refreshAt = new Date(
        // Upon user's activity, refresh 5 minutes before token actually expires.
        // User inactivity till the access token expires will force re-authentication
        Date.now().valueOf() + expiresAt.valueOf() - 5 * 60
      );

      const jwt = {
        accessToken: response.data.token,
        expiresAt,
        refreshAt,
      };
      Logger.info(jwt, 'jwtData');
      // this.saveCachedJwt(jwt);
      return jwt;
    } else {
      return response;
    }
  }

  refreshToken() {
    const jwt = this.getCachedJwt();
    this.destroyCachedJwt();
    try {
      jwt.accessToken = refresh();
      this.saveCachedJwt(jwt);
      return jwt;
    } catch (error) {
      Logger.error(error);
      return null;
    }
  }

  //check the status of the token
  checkCachedJwtStatus = () => {
    const userInfoCache = this.getCachedJwt();
    if (userInfoCache && Object.keys(userInfoCache).length != 0) {
      if (userInfoCache.refreshAt > new Date().toISOString()) {
        return 'OKAY';
      } else if (userInfoCache.expiresAt <= new Date().toISOString()) {
        return 'EXPIRED';
      } else {
        return 'NEED_REFRESH';
      }
    } else return 'NO_TOKEN';
  };

  getRefreshToken() {
    return JSON.parse(this.getCachedJwt().refreshToken);
  }

  getCachedJwt() {
    const userInfoCache: any = localStorage.getItem('userInfoCache');
    if (userInfoCache) {
      Logger.info('found');
      return JSON.parse(userInfoCache);
    } else {
      Logger.error('not found');
      return {};
    }
  }

  getCachedJwtToken() {
    return this.getCachedJwt().accessToken;
  }

  saveCachedJwt(jwt: ICachedJWT | ICachedJWTEmpty) {
    localStorage.setItem('userInfoCache', JSON.stringify(jwt));
  }

  destroyCachedJwt() {
    localStorage.removeItem('userInfoCache');
  }
}

export default new AuthService() as AuthService;
