import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { logadoGuard } from './logado.guard';
import { LoginService } from '../services/login/login.service';
import { ToastrService } from 'ngx-toastr';

export const enfermeiroGuard: CanActivateFn = (route, state) => {
  if(inject(LoginService).obterTipoUsuarioLogado() === "ENFERMEIRO"){
    inject(ToastrService).error('Usuário sem acesso!','Atenção');
    inject(Router).navigate(['labmedication']);
    return false;
  }else{
    return true;
  }
};
