import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { LoginService } from '../services/login/login.service';

export const logadoGuard: CanActivateChildFn = (childRoute, state) => {
  inject(LoginService).mudouURL(state.url);
  return true;
};
