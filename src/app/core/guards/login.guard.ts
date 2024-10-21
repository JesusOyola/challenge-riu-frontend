import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RouterPathNames } from '../../enum/router-path-names';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  if(token){
    return true;
  }else{

    router.navigate([`/${RouterPathNames.login}`])
    return false
  }
  
};
