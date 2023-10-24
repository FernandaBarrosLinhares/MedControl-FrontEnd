
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { UsuariosService } from 'src/app/services/usuario/usuario.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  formulariocadastro:any = FormGroup;
  usuario: any;
  usuarioId: number = 0;
  mensagemCadastro:string="";


  constructor(private usuarioService: UsuariosService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {

    this.formulariocadastro = this.fb.group({
      nome: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ]],
      genero: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      telefone: ['', [Validators.required, Validators.minLength(11)]],
      email: ['', [Validators.required,Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      tipo: ['', Validators.required]
    });

  }
  async ngOnInit() {
		const params = await firstValueFrom(this.route.queryParams);

    if (params['id']) {
      this.usuarioId = Number(params['id']);
      this.usuario = await this.usuarioService.buscarUsuarioId(this.usuarioId);
      if (this.usuario == null) {
        this.usuarioId = 0;
        this.router.navigate(['/cadastro-usuario']);
        return;
      }
      this.formulariocadastro.setValue(
        {
        nome: this.usuario.nome,
        genero: this.usuario.genero,
        cpf: this.usuario.cpf,
        telefone: this.usuario.telefone,
        email: this.usuario.email,
        senha: this.usuario.senha,
        tipo: this.usuario.tipo
        }
      )
    }else {
      this.formulariocadastro.get('status').disable();
    }
  }

  async cadastroUsuario() {
      const usuario: IUsuario = {
        nome: this.formulariocadastro.get('nome')?.value,
        genero: this.formulariocadastro.get('genero')?.value,
        cpf: this.formulariocadastro.get('cpf')?.value,
        telefone: this.formulariocadastro.get('telefone')?.value,
        email: this.formulariocadastro.get('email')?.value,
        senha: this.formulariocadastro.get('senha')?.value,
        tipo: this.formulariocadastro.get('tipo')?.value,
      };

  if (this.usuarioId) {
    usuario.id = this.usuarioId;
    await this.usuarioService.editarUsuario(usuario);
    this.router.navigate(["/"]);
  } else {
    await this.usuarioService.cadastrarUsuario(usuario);
    this.router.navigate(["/"]);
  }
  }

  deletarUsuario() {
    this.usuarioService.deletarUsuario(this.usuarioId);
    this.router.navigate(["/"]);

}
}
