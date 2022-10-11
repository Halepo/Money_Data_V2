import { ICachedJWT } from '../interface/authTypes';
import AuthService from './AuthService';

export default function useFetchUserDetail(): ICachedJWT | {} {
  let userInfoCache: any = sessionStorage.getItem('userInfoCache');
  if (userInfoCache) return JSON.parse(userInfoCache);
  else return {};
}
// export function useSetUserDetail() {
//   const JWTStatus = AuthService.saveCachedJwt();
//   return;
// }
