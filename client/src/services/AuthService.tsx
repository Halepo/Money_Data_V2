import { refreshToken } from './ApiService';
import jwt_decode from 'jwt-decode';
import { Navigate } from 'react-router';

export class AuthService {
  //store Token
  saveAccessTokenAsCachedJwt(response: any) {
    if (response.data.sign_in.token) {
      this.destroyCachedJwt();
      const expiresAt = new Date(
        jwt_decode(response.data.sign_in.token).exp * 1000
      );
      //const expiresAt = new Date(Date.now() + expiresIn);
      const refreshAt = new Date(
        // Upon user's activity, refresh 5 minutes before token actually expires.
        // User inactivity till the access token expires will force re-authentication
        Date.now() + expiresAt - 5 * 60
      );

      const jwt = {
        accessToken: response.data.sign_in.token,
        roleId: response.data.user.role_id,
        roleName: response.data.user.role.role_name,
        fullName: response.data.user.full_name,
        userId: response.data.user.id,
        companyId: response.data.user.company_id,
        refreshToken: response.data.sign_in.refresh_token,
        expiresAt,
        refreshAt,
      };
      this.saveCachedJwt(jwt);
      return jwt;
    } else {
      return response;
    }
  }

  refreshToken() {
    let jwt = AuthService.getCachedJwt();
    let refreshTokenToken = jwt.refreshToken;
    AuthService.destroyCachedJwt();
    try {
      jwt.accessToken = refreshToken(refreshTokenToken);
      AuthService.saveCachedJwt(jwt);
      return jwt;
    } catch (error) {
      console.log(error);
      return console.log('error');
    }
  }

  //check the status of the token
  checkCachedJwtStatus = () => {
    let cachedJwt = this.getCachedJwt();
    if (cachedJwt) {
      if (cachedJwt.refreshAt > new Date().toISOString()) return 'OKAY';
      else if (cachedJwt.expiresAt <= new Date().toISOString())
        return 'EXPIRED';
      else return 'REFRESH';
    } else return 'NOTOKEN';
  };

  checkCachedJwtRole = () => {
    let cachedJwt = this.getCachedJwt();
    if (cachedJwt) {
      if (cachedJwt.roleId === 1) return 'admin';
      else if (cachedJwt.roleId === 2) return 'companyAdmin';
      else if (cachedJwt.roleId === 3) return 'clerk';
      //if the role is 1 Admin return Admin
      //is the role is
      else return 'unknown';
    } else return 'unknown';
  };

  getRefreshToken() {
    return JSON.parse(this.getCachedJwt().refreshToken);
  }

  getCachedJwt() {
    return JSON.parse(sessionStorage.getItem('cachedJwt'));
  }

  getCachedJwtToken() {
    return this.getCachedJwt().accessToken;
  }

  saveCachedJwt(jwt) {
    sessionStorage.setItem('cachedJwt', JSON.stringify(jwt));
  }

  destroyCachedJwt() {
    sessionStorage.removeItem('cachedJwt');
  }

  handleLogOut() {
    this.destroyCachedJwt();
    return <Navigate to="/login" />;
  }
}

export default new AuthService();
