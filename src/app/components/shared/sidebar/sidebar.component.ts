import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private loginService: LoginService) {}

  deslogar() {
    this.loginService.logout();
  }

  getTipoUsuarioLogado() {
    return this.loginService.obterTipoUsuarioLogado();
  }
}
