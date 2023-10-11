import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConsultaService } from 'src/app/services/consulta/consulta.service';


@Component({
  selector: 'app-cadastro-consulta',
  templateUrl: './cadastro-consulta.component.html',
  styleUrls: ['./cadastro-consulta.component.css']
})
export class CadastroConsultaComponent implements AfterViewInit{

  formConsulta: any = FormGroup;
	pacientes = [
		{ id: 1, nome: "Ana" },
		{ id: 2, nome: "Paula"},
		{ id: 3, nome: "Daniela"}
	];
	temId: boolean = false;


	constructor(private fb: FormBuilder, private service: ConsultaService, private rota: ActivatedRoute) {
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
	ngAfterViewInit(): void {
		const checkbox: HTMLElement | null = document.getElementById('status');
		if (checkbox == null) return;
		checkbox.setAttribute('disabled', 'true');
	}

	cadastrar() {
		this.service.salvar(this.formConsulta.value);

		let consulta = this.formConsulta.value;
		let data = this.formConsulta.get('data').value;
		consulta.data = this.convertInputDateToBdDate(data);

		consulta.paciente = {id: this.formConsulta.get('paciente').value};
		this.service.salvar(consulta);
	}

	deletar() {
		// this.storagePacientes.deletarPaciente('PACIENTES', this.form.value);
		// this.formPaciente.resetForm();
		// this.mensagem = 'Paciente excluido';
		// this.formPaciente.disabled;
		// this.limparMensagens();

	}
	editar() {
		// this.form.enable();
	}

	convertInputDateToBdDate(data: string): string {
		let dataArray = data.split('-');
		return `${dataArray[2]}/${dataArray[1]}/${dataArray[0]}`;
	}

	convertBdDateToInputDate(data: string): string {
		let dataArray = data.split('-');
		return `${dataArray[2]}-${dataArray[1]}-${dataArray[0]}`;
	}

}
