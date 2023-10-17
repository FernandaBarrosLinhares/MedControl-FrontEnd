import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  nomePagina: string = 'Cadastro de Exame';
  nomeUsuario: string = 'Eduardo Cesar';

  ngOnInit() {
    // TODO buscar o nome da pagina pelo service
  }
}
