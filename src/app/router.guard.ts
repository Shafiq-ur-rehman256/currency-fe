import { CanActivateFn } from '@angular/router';

export const routerGuard: CanActivateFn = (route, state) => {
  
  const token = localStorage.getItem('token')
  if(!token){
    return false
  }
  return true
};
