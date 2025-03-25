

import { inject } from '@angular/core';
import { 
  ActivatedRouteSnapshot, 
  CanActivateFn, 
  Router, 
  RouterStateSnapshot } from '@angular/router';


export const userauthGuard: CanActivateFn =(
  route:ActivatedRouteSnapshot,
  state:RouterStateSnapshot
)=>{

  `
   role based access control, Check url-> baseurl/{userrole} ,return true based on userrole
  `

  const router=inject(Router);
  const token=localStorage.getItem('auth_token')
  const role=localStorage.getItem('user_role')
  if(token&&role){
    
    if (role=='Employee' && state.url.startsWith('/employees')){
     return true;
    }
    else if(role=='Admin' && state.url.startsWith('/admins')){
     return true;
    }
    else if(role=='Manager'&&state.url.startsWith('/managers')){
     return true;
    }
    else{
      return false;
    }
    

  }

  
  else{

    if (state.url.startsWith('/employees')){

    router.navigate(['/employees/login']);
    }

    else if (state.url.startsWith('/managers')){
      router.navigate(['/managers/login']);
    }

    
    else if (state.url.startsWith('/admins')){
      router.navigate(['/admins/login']);
    }
    return false
  }



};