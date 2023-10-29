import { Component } from '@angular/core';
import { ConfigService } from 'src/app/services/config/config.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  nomeEmpresa: string = '';

  constructor(
    private loginService: LoginService,
    private configService: ConfigService
  ) {
    this.configService.configMudou.subscribe(configs => {
      this.nomeEmpresa = configs.nomeEmpresa;
    });
  }

  deslogar() {
    this.loginService.logout();
  }

  getTipoUsuarioLogado() {
    return this.loginService.obterTipoUsuarioLogado();
  }

  buscarModal(): HTMLDialogElement | null {
    const modal = document.querySelector<HTMLDialogElement>('#modal-config');
    return modal;
  }

  abrirConfigModal() {
    const modal = this.buscarModal();
    if (modal === null) return;
    modal.showModal();
  }
}
