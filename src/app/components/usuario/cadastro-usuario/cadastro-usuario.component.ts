import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { UsuariosService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css'],
})
export class CadastroUsuarioComponent implements OnInit {
  formularioCadastro: any = FormGroup;
  usuario: any;
  usuarioId: number = 0;
  mensagemCadastro: string = '';

  constructor(
    private usuarioService: UsuariosService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.formularioCadastro = this.fb.group({
      nomeCompleto: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
        ],
      ],
      genero: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      telefone: ['', [Validators.required, Validators.minLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      tipoUsuario: ['', [Validators.required]],
      status: [true, [Validators.required]],
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
      this.formularioCadastro.setValue({
        nomeCompleto: this.usuario.nomeCompleto,
        genero: this.usuario.genero,
        cpf: this.usuario.cpf,
        telefone: this.usuario.telefone,
        email: this.usuario.email,
        senha: 'SOU_UMA_SENHA_DE_EXEMPLO_SÓ_PRA_NÂO_DEIXAR_O_INPUT_VAZIO',
        tipoUsuario: this.usuario.tipoUsuario,
        status: this.usuario.status
      });
      this.formularioCadastro.get('senha').disable();
      this.formularioCadastro.get('cpf').disable();
    } else {
      this.formularioCadastro.get('status').disable();
    }
  }

  async cadastroUsuario() {
    const usuario: IUsuario = {
      nomeCompleto: this.formularioCadastro.get('nomeCompleto')?.value,
      genero: this.formularioCadastro.get('genero')?.value,
      cpf: this.formularioCadastro.get('cpf')?.value,
      telefone: this.formularioCadastro.get('telefone')?.value,
      email: this.formularioCadastro.get('email')?.value,
      senha: this.formularioCadastro.get('senha')?.value,
      tipoUsuario: this.formularioCadastro.get('tipoUsuario')?.value,
      status: this.formularioCadastro.get('status')?.value,
    };

    if (this.usuarioId) {
      usuario.id = this.usuarioId;
      await this.usuarioService.editarUsuario(usuario);
    } else {
      await this.usuarioService.cadastrarUsuario(usuario);
    }
    this.router.navigate(['/labmedication']);
  }

  deletarUsuario() {
    this.usuarioService.deletarUsuario(this.usuarioId);
    this.router.navigate(['/labmedication']);
  }
}
