import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { IDieta } from 'src/app/interfaces/IDieta';
import { DietaService } from 'src/app/services/dieta/dieta.service';
import { PacienteService } from 'src/app/services/paciente/paciente.service';

@Component({
  selector: 'app-cadastro-dieta',
  templateUrl: './cadastro-dieta.component.html',
  styleUrls: ['./cadastro-dieta.component.css'],
})
export class CadastroDietaComponent implements OnInit {
  formDieta: any = FormGroup;
  dieta: any;
  dietaId: number = 0;
  pacientes: any = [];
  dietaRetorno: any = {};

  constructor(
    private service: DietaService,
    private pacienteService: PacienteService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.formDieta = this.formBuilder.group({
      nome: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ]),
      ],
      data: ['', Validators.required],
      horario: ['', Validators.required],
      tipo: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(32),
        ]),
      ],
      descricao: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(1000),
        ]),
      ],
      status: [true, [Validators.required]],
      paciente: ['', Validators.required],
    });
  }
  async ngOnInit() {
    this.dietaRetorno = await this.service.buscarDieta();
    console.log(this.dietaRetorno);
    this.pacientes = await this.pacienteService.buscarPaciente();
    const params = await firstValueFrom(this.route.queryParams);

    if (params['id']) {
      this.dietaId = Number(params['id']);

      this.dieta = await this.service.buscarDietaId(this.dietaId);
      if (this.dieta == null) {
        this.dietaId = 0;
        this.router.navigate(['/cadastro-dieta']);
        return;
      }

      this.formDieta.setValue({
        nome: this.dieta.nome,
        data: this.convertBdDateToInputDate(this.dieta.data),
        horario: this.dieta.horario,
        tipo: this.dieta.tipo,
        descricao: this.dieta.laboratorio,
        status: this.dieta.status,
        paciente: {
          id: this.formDieta.get('paciente')?.value,
        },
      });
    } else {
      this.formDieta.get('status').disable();
    }
  }

  async cadastrarDieta() {
    let data = this.formDieta.get('data').value;

    let dieta: IDieta = {
      nome: this.formDieta.get('nome')?.value,
      data: this.convertInputDateToBdDate(data),
      horario: this.formDieta.get('horario')?.value,
      tipo: this.formDieta.get('tipo')?.value,
      descricao: this.formDieta.get('descricao')?.value,
      status: this.formDieta.get('status')?.value,
      paciente: this.formDieta.get('paciente')?.value,
    };
    if (this.dietaId) {
      dieta.id = this.dietaId;
      this.dietaRetorno = await this.service.editarDieta(dieta, this.dietaId);
      this.router.navigate(['/']);
    } else {
      this.dietaRetorno = await this.service.cadastrarDieta(dieta);
      this.dieta = this.dietaRetorno;
      this.router.navigate(['/']);
    }
  }

  async deletarUsuario() {
    await this.service.deletarDieta(this.dietaId);
    this.router.navigate(['/']);
  }
  convertInputDateToBdDate(data: string): string {
    let dataArray = data.split('-');
    return `${dataArray[2]}/${dataArray[1]}/${dataArray[0]}`;
  }

  convertBdDateToInputDate(data: string): string {
    let dataArray = data.split('/');
    return `${dataArray[2]}-${dataArray[1]}-${dataArray[0]}`;
  }
}
