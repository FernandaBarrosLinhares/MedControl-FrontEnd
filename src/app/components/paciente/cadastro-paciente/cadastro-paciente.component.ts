import { Component, OnInit,} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import IPaciente from 'src/app/interfaces/IPaciente';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { ViaCepServiceService } from 'src/app/services/viaCep/via-cep-service.service';

@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.css']
})
export class CadastroPacienteComponent implements OnInit {
  formPaciente: any = FormGroup;
  erroCep: boolean = false;
  mensagem: String = '';
  paciente: any = {};
  pacienteRetorno: any = {};
  endereco: any = {};
  pacienteId: number = 0;

  constructor(private pacienteService: PacienteService,
    private fb: FormBuilder,
    private cepService: ViaCepServiceService,
    private rotaAtiva: ActivatedRoute,
    private router: Router,
    private servicePaciente: PacienteService) {
    this.formPaciente = this.fb.group({
      nomeCompleto: ['', { validators: [Validators.required, Validators.maxLength(64), Validators.minLength(8)] }],
      genero: ['', Validators.required],
      dataNascimento: ['', { validators: [Validators.required, Validators.maxLength(10)] }],
      cpf: ['', { validators: [Validators.required, Validators.minLength(11)] }],
      rg: ['', { validators: [Validators.required, Validators.maxLength(20)] }],
      estadoCivil: ['', { validators: [Validators.required] }],
      telefone: ['', { validators: [Validators.required, Validators.minLength(11)] }],
      email: ['', { validators: [Validators.email, Validators.required] }],
      naturalidade: ['', { validators: [Validators.required, Validators.maxLength(64), Validators.minLength(8)] }],
      contatoEmergencia: ['', { validators: [Validators.required, Validators.minLength(11)] }],
      alergias: ['', { validators: [Validators.maxLength(1024)] }],
      cuidadosEspecificos: ['', { validators: [Validators.maxLength(1024)] }],
      convenio: ['Sem convênio'],
      numeroConvenio: [''],
      validadeConvenio: ['', { validators: [Validators.maxLength(7)] }],
      cep: ['', { validators: [Validators.required, Validators.minLength(8)] }],
      cidade: ['', { validators: [Validators.required] }],
      estado: ['', { validators: [Validators.required] }],
      logradouro: ['', { validators: [Validators.required] }],
      numero: ['', { validators: [Validators.required] }],
      complemento: [''],
      bairro: ['', { validators: [Validators.required] }],
      referencia: [''],
      status: [true, { validators: [Validators.required] }]
    });

  }
  async ngOnInit() {
    const params = await firstValueFrom(this.rotaAtiva.queryParams);
    if (params['id']) {
      this.pacienteId = Number(params['id']);
      this.paciente = await this.pacienteService.buscarPacientePorId(this.pacienteId);
      if (this.paciente == null) {
        this.pacienteId = 0;
        this.router.navigate(['/cadastro-paciente']);
        return;
      }
      this.paciente.endereco.cep = this.convertCepToinput(this.paciente.endereco.cep);
      this.paciente.dataNascimento = this.convertBdDateToInputDate(this.paciente.dataNascimento);
      this.paciente.validadeConvenio = this.convertBdDateToInputDateConvenio(this.paciente.validadeConvenio);
      this.formPaciente.patchValue(this.paciente);
      this.formPaciente.patchValue(this.paciente.endereco);
      this.formPaciente.get('estadoCivil').setValue(this.paciente.estadoCivil);
      this.formPaciente.get('genero').setValue(this.paciente.genero);
      this.formPaciente.get('cpf').disable();
      this.formPaciente.get('rg').disable();
    }else{
      this.formPaciente.get('status').disable();
    }

  }


  pegarCep() {
    let cep = this.formPaciente.get('cep').value;
    if (this.formPaciente.get('cep').value.length >= 8) {
      this.cepService.getEndereco(this.formPaciente.get('cep').value).subscribe((response) => {
        if (response.erro) {
          this.erroCep = true;
          this.endereco = {
            cep: cep,
            cidade: "",
            estado: "",
            logradouro: "",
            bairro: "",
          };
        } else {
          this.erroCep = false;
          this.endereco = {
            cep: response.cep,
            cidade: response.localidade,
            estado: response.uf,
            logradouro: response.logradouro,
            bairro: response.bairro,
          };
        }
        this.formPaciente.patchValue(this.endereco);
      });
    } else {
      this.erroCep = false;
    }

  }
  async cadastrar() {
    if (this.formPaciente.invalid) {
      return;
    }
    let paciente: IPaciente = {
      nomeCompleto: this.formPaciente.get('nomeCompleto').value,
      genero: this.formPaciente.get('genero').value,
      cpf: this.formPaciente.get('cpf').value,
      telefone: this.formPaciente.get('telefone').value,
      email: this.formPaciente.get('email').value,
      dataNascimento: this.convertInputDateToBdDate(this.formPaciente.get('dataNascimento').value),
      rg: this.formPaciente.get('rg').value,
      estadoCivil: this.formPaciente.get('estadoCivil').value,
      naturalidade: this.formPaciente.get('naturalidade').value,
      contatoEmergencia: this.formPaciente.get('contatoEmergencia').value,
      alergias: this.formPaciente.get('alergias').value,
      cuidadosEspecificos: this.formPaciente.get('cuidadosEspecificos').value,
      convenio: this.formPaciente.get('convenio').value,
      numeroConvenio: this.formPaciente.get('numeroConvenio').value,
      validadeConvenio: this.convertInputDateToBdDateConvenio(this.formPaciente.get('validadeConvenio').value),
      endereco: {
        cep: this.convertCepToDb(this.formPaciente.get('cep').value),
        cidade: this.formPaciente.get('cidade').value,
        estado: this.formPaciente.get('estado').value,
        logradouro: this.formPaciente.get('logradouro').value,
        numero: this.formPaciente.get('numero').value,
        complemento: this.formPaciente.get('complemento').value,
        bairro: this.formPaciente.get('bairro').value,
        referencia: this.formPaciente.get('referencia').value,
      },
      status: this.formPaciente.get('status').value,
    }

    if (this.pacienteId) {
      this.pacienteRetorno = await this.pacienteService.atualizarPaciente(paciente,this.pacienteId);
      this.router.navigate(['labmedication', 'prontuarios', 'paciente'], {
        queryParams: { id: this.pacienteId },
      });
    }else{
      this.pacienteRetorno = await this.pacienteService.cadastrarPaciente(paciente);
      this.paciente = this.pacienteRetorno;
      this.router.navigate(['/labmedication']);
    }
  }

  async deletar() {
    let deletado = await this.servicePaciente.deletarPaciente(this.pacienteId);
    if(!deletado){
      return;
    }
    this.router.navigate(['/labmedication']);
  }
  desablitarCpf(){
    this.formPaciente.get('cpf').disable();
  }
  habilitarCpf(){
    this.formPaciente.get('cpf').enable();
  }

  convertInputDateToBdDate(data: string): any {
    if (data == '') return null;
    let dataArray = data.split('-');
    return `${dataArray[2]}/${dataArray[1]}/${dataArray[0]}`;
  }

  convertBdDateToInputDate(data: string): any {
    if (data == '') return null;
    let dataArray = data.split('/');
    return `${dataArray[2]}-${dataArray[1]}-${dataArray[0]}`;
  }

  convertInputDateToBdDateConvenio(data: string): any {
    if (data == '') return null;
    let dataArray = data.split('-');
    return `${dataArray[1]}/${dataArray[0]}`;
  }

  convertBdDateToInputDateConvenio(data: string): string {
    if (data == null || data == '') return "";
    let dataArray = data.split('/');
    return `${dataArray[1]}-${dataArray[0]}`;
  }

  convertCepToDb(cep: String) {
    let cepArray = cep.split('-')
    return cepArray[0] + cepArray[1];
  }
  convertCepToinput(cep: String) {
    let cepInput = cep.slice(0,5)+"-"+cep.slice(5,8)
    return cepInput;
  }
}

