import { Component } from '@angular/core';
import { ConfigService } from './services/config/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'modulo3_projeto';
  corPrincipal = '';
  corFonte = '';
  corFundo = '';

  constructor(
    private configService: ConfigService
  ) {
    this.configService.configMudou.subscribe(configs => {
      const { nomeEmpresa, corFonte, corPrincipal } = configs;
      this.title = nomeEmpresa;
      this.corPrincipal = corPrincipal;
      this.corFonte = corFonte;
      this.corFundo = this.invertColor(this.corFonte);
      document.title = nomeEmpresa;
      this.alterarCSS();
    });
  }

  alterarCSS() {
    const root = document.querySelector(':root');
    if (root === null) return;
    document.documentElement.style.setProperty('--cor-primaria', this.corPrincipal);
    document.documentElement.style.setProperty('--cor-fonte', this.corFonte);
    document.documentElement.style.setProperty('--cor-fundo', this.corFundo);
  }

  invertColor(hex: string, bw: boolean = false) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    let r: any = parseInt(hex.slice(0, 2), 16),
        g: any = parseInt(hex.slice(2, 4), 16),
        b: any = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + this.padZero(r) + this.padZero(g) + this.padZero(b);
  }

  padZero(str: string, len?: number) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
  }
}
