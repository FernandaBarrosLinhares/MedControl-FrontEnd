import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { UsuariosService } from 'src/app/services/usuario/usuario.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent {

  cadastroUsusarioForm: FormGroup;
  usuarioId: number = 0;

  constructor(private usuarioService: UsuariosService, private router: Router) {
    this.cadastroUsusarioForm = new FormGroup({
      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ]),
      genero: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      tipo: new FormControl('', Validators.required),
    });
  }

  async cadastrarUsuario() {
    const usuario: IUsuario = {
      nome: this.cadastroUsusarioForm.get('nome')?.value,
      genero: this.cadastroUsusarioForm.get('genero')?.value,
      cpf: this.cadastroUsusarioForm.get('cpf')?.value,
      telefone: this.cadastroUsusarioForm.get('telefone')?.value,
      email: this.cadastroUsusarioForm.get('email')?.value,
      senha: this.cadastroUsusarioForm.get('senha')?.value,
      tipo: this.cadastroUsusarioForm.get('tipo')?.value,
    };
    await this.usuarioService.cadastrarUsuario(usuario);
    this.router.navigate([''])
  }

  async editarUsuario() {
    const usuario: IUsuario = {
    nome: this.cadastroUsusarioForm.get('nome')?.value,
    genero: this.cadastroUsusarioForm.get('genero')?.value,
    cpf: this.cadastroUsusarioForm.get('cpf')?.value,
    telefone: this.cadastroUsusarioForm.get('telefone')?.value,
    email: this.cadastroUsusarioForm.get('email')?.value,
    senha: this.cadastroUsusarioForm.get('senha')?.value,
    tipo: this.cadastroUsusarioForm.get('tipo')?.value,
  };
  await this.usuarioService.editarUsuario(usuario);
  this.router.navigate([''])
  }

  deletarUsuario() {
    this.usuarioService.deletarUsuario(this.usuarioId);
  }
}
