import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const adminGuard: CanActivateFn = (route, state) => {
  if(inject(LoginService).obterTipoUsuarioLogado() === "ADMINISTRADOR") {
    return true;
  } else{
    inject(ToastrService).error('Usuário sem acesso!','Atenção');
    inject(Router).navigate(['labmedication']);
    return false;
  }
};
