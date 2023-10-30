import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import IConfig from 'src/app/interfaces/IConfig';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'app-configs',
  templateUrl: './configs.component.html',
  styleUrls: ['./configs.component.css']
})
export class ConfigsComponent implements OnInit{
  formConfig: FormGroup;
  configs: IConfig | null;

  constructor(
    private fb: FormBuilder,
    private configService: ConfigService
  ) {
    this.formConfig = this.fb.group({
      nomeEmpresa: ['', [Validators.required]],
      logoUrl: ['', [Validators.required]],
      corFonte: ['', [Validators.required]],
      corPrincipal: ['', [Validators.required]]
    });
    this.configs = this.configService.configs;
  }

  async ngOnInit() {
    await this.definirCampos();
  }

  abrirModal() {
    const modal = this.buscarModal();
    if (modal === null) return;
    modal.showModal();
    this.definirCampos();
  }

  async fecharModal(salvar = true) {
    const modal = this.buscarModal();
    if (modal === null) return;

    modal.close();
    if (!salvar) return;
    const configs: IConfig = {
      nomeEmpresa: this.formConfig.get('nomeEmpresa')?.value,
      logoUrl: this.formConfig.get('logoUrl')?.value,
      corFonte: this.formConfig.get('corFonte')?.value,
      corPrincipal: this.formConfig.get('corPrincipal')?.value,
    }
    await this.configService.editar(configs);
  }

  buscarModal(): HTMLDialogElement | null {
    const modal = document.querySelector<HTMLDialogElement>('#modal-config');
    return modal;
  }

  async definirCampos() {
    this.configs = await this.configService.buscarConfigs();
    if (this.configs === null) this.configs = this.configService.configs;
    this.formConfig.setValue({
      nomeEmpresa: this.configs?.nomeEmpresa || '',
      logoUrl: this.configs?.logoUrl || '',
      corFonte: this.configs?.corFonte || '',
      corPrincipal: this.configs?.corPrincipal || ''
    })
  }
}
