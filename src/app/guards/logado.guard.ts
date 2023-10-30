import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { UrlService } from '../services/url/url.service';

export const logadoGuard: CanActivateChildFn = (childRoute, state) => {
  inject(UrlService).mudouURL(state.url);
  if (inject(LoginService).logado()) {
    return true;
  } else {
    inject(Router).navigate(['/']);
    return false;
  }
};
