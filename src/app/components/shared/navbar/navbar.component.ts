import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { UrlService } from 'src/app/services/url/url.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements OnInit {
  nomePagina: string = '';
  nomeUsuario: string = '';

  constructor(private loginService: LoginService, private urlService: UrlService, private router: Router) {
    this.urlService.urlEventEmitter.subscribe(url => {
      this.nomePagina = this.urlService.definirTituloPagina(url);
    });
  }
  
  ngOnInit() {
    if (!this.loginService.logado()) return;
    
    this.nomeUsuario = this.loginService.obterNomeUsuarioLogado() || '';
    this.nomePagina = this.urlService.definirTituloPagina(this.router.url);
  }
}
