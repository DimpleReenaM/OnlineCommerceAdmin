import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
    const router = inject(Router); // ✅ Proper way in functional guard



  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('Role');

    if (token && role === 'ADMIN') {   
      return true;
    } else {
      window.alert('Access Denied! Login First');
      router.navigate(['/']);
      return false;
    }
  }

  // If not in browser (SSR), deny access
  return false;};
