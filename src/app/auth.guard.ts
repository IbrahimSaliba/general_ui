import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = checkLoginStatus(); // Implement your logic to check login status

  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};

function checkLoginStatus(): boolean {
  // Your logic to check if the user is logged in
  let tokenValid = localStorage.getItem('auth-token');
  if (tokenValid != null && tokenValid != "") {
    return true;

  } else return false;
}