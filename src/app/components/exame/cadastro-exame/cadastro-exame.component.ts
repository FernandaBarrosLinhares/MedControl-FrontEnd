import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExameService } from 'src/app/services/exame.service';

@Component({
	selector: 'app-cadastro-exame',
	templateUrl: './cadastro-exame.component.html',
	styleUrls: ['./cadastro-exame.component.css']
})
export class CadastroExameComponent implements AfterViewInit {
	formExame: any = FormGroup;
	pacientes = [
		{ id: 1, nome: "Ana" },
		{ id: 2, nome: "Paula"}, 
		{ id: 3, nome: "Daniela"}
	];
	temId: boolean = false;


	constructor(private fb: FormBuilder, private service: ExameService, private rota: ActivatedRoute) {
		this.formExame = this.fb.group({
			nome: ['', [Validators.required, Validators.maxLength(64), Validators.minLength(8)]],
			data: ['', [Validators.required]],
			horario: ['', [Validators.required]],
			tipo: ['', [Validators.required, Validators.maxLength(32), Validators.minLength(4)]],
			laboratorio: ['', [Validators.required, Validators.maxLength(32), Validators.minLength(4)]],
			urlDocumento: ['', []],
			resultados: ['', [Validators.required, Validators.maxLength(1024), Validators.minLength(16)]],
			paciente: ['', [Validators.required]],
			status: [true, [Validators.required]],
		});
	}
	ngAfterViewInit(): void {
		const checkbox: HTMLElement | null = document.getElementById('status');
		if (checkbox == null) return;
		checkbox.setAttribute('disabled', 'true');
	}
	
	cadastrar() {
		this.service.salvar(this.formExame.value);

		let exame = this.formExame.value;
		let data = this.formExame.get('data').value;
		exame.data = this.convertInputDateToBdDate(data);

		exame.paciente = {id: this.formExame.get('paciente').value};
		this.service.salvar(exame);
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


