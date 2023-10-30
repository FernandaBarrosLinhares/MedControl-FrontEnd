import { AbstractControl, ValidationErrors } from '@angular/forms';

export class ConfirmarSenha implements ValidationErrors {
  static confirmarSenhaValidations(
    control: AbstractControl
  ): ValidationErrors | null {
    const senha = control.get('senha')?.value;
    const confirmarSenha = control.get('repetirSenha')?.value;
    if (senha === confirmarSenha) {
      return null;
    } else {
      return { confirmarSenha: true };
    }
  }
}