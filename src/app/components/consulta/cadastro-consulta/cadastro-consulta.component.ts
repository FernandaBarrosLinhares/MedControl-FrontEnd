import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import IConsulta from 'src/app/interfaces/IConsulta';
import { ConsultaService } from 'src/app/services/consulta/consulta.service';


@Component({
  selector: 'app-cadastro-consulta',
  templateUrl: './cadastro-consulta.component.html',
  styleUrls: ['./cadastro-consulta.component.css']
})
export class CadastroConsultaComponent implements OnInit{

  formConsulta: any = FormGroup;
	pacientes: any = [];
	consultaId: number  = 0;
  consulta: any;


	constructor(
    private fb: FormBuilder,
    private service: ConsultaService,
    private route: ActivatedRoute,
    private router: Router
     ) {
		this.formConsulta = this.fb.group({
			nome: ['', [Validators.required, Validators.maxLength(64), Validators.minLength(8)]],
			data: ['', [Validators.required]],
			horario: ['', [Validators.required]],
			descricao: ['', [Validators.required, Validators.maxLength(1024), Validators.minLength(16)]],
			medicacao: ['' ],
      dosagem: ['', [Validators.required, Validators.maxLength(256), Validators.minLength(16)]],
			paciente: ['', [Validators.required]],
			status: [true, [Validators.required]]
		});
	}

  async ngOnInit() {
		this.pacientes = await this.service.buscarTodosPacientes();
		const params = await firstValueFrom(this.route.queryParams);

    if (params['id']) {
      this.consultaId = Number(params['id']);

      this.consulta = await this.service.buscarPorId(this.consultaId);
      if (this.consulta == null) {
        this.consultaId = 0;
        this.router.navigate(['/cadastro-consulta']);
        return;
      }

      this.formConsulta.setValue({
        nome: this.consulta.nome,
        data: this.convertBdDateToInputDate(this.consulta.data),
        horario: this.consulta.horario,
        descricao: this.consulta.descricao,
        dosagem: this.consulta.dosagem,
        status: this.consulta.status,
        paciente: this.consulta.paciente.id
      });
    } else {
      this.formConsulta.get('status').disable();
    }
	}

  async onSubmit() {
    let data = this.formConsulta.get('data').value;

    let consulta: IConsulta = {

      nome: this.formConsulta.get('nome')?.value,
      data: this.convertInputDateToBdDate(data),
      horario: this.formConsulta.get('horario')?.value,
      descricao: this.formConsulta.get('descricao')?.value,
      dosagem: this.formConsulta.get('dosagem')?.value,
      medicacao:this.formConsulta.get('medicacao')?.value,
      status: this.formConsulta.get('status')?.value,
      paciente: {
        id: this.formConsulta.get('paciente')?.value,
      },
    };
    if (this.consultaId) {
      consulta.id = this.consultaId;
      await this.service.editar(consulta);
    } else {
      await this.service.salvar(consulta);
    }

  }
	// ngAfterViewInit(): void {
	// 	const checkbox: HTMLElement | null = document.getElementById('status');
	// 	if (checkbox == null) return;
	// 	checkbox.setAttribute('disabled', 'true');
	// }

	// cadastrar() {
	// 	this.service.salvar(this.formConsulta.value);

	// 	let consulta = this.formConsulta.value;
	// 	let data = this.formConsulta.get('data').value;
	// 	consulta.data = this.convertInputDateToBdDate(data);

	// 	consulta.paciente = {id: this.formConsulta.get('paciente').value};
	// 	this.service.salvar(consulta);
	// }

	deletar() {

    this.service.excluir(this.consultaId);
    this.router.navigate(["/"]);
		// this.storagePacientes.deletarPaciente('PACIENTES', this.form.value);
		// this.formPaciente.resetForm();
		// this.mensagem = 'Paciente excluido';
		// this.formPaciente.disabled;
		// this.limparMensagens();

	}
	// editar() {
	// 	// this.form.enable();
	// }

	convertInputDateToBdDate(data: string): string {
		let dataArray = data.split('-');
		return `${dataArray[2]}/${dataArray[1]}/${dataArray[0]}`;
	}

	convertBdDateToInputDate(data: string): string {
		let dataArray = data.split('-');
		return `${dataArray[2]}-${dataArray[1]}-${dataArray[0]}`;
	}

}
