import IEndereco from "./IEndereco";

export default interface IPaciente{
  id?:number,
  nomeCompleto:string,
  genero:string,
  cpf:string,
  telefone:string,
  email:string,
  dataNascimento:string,
  rg:string,
  estadoCivil:string,
  naturalidade:string,
  contatoEmergencia:string,
  alergias?:string,
  cuidadosEspecificos?:string,
  convenio?:string,
  numeroConvenio?:string,
  validadeConvenio?:string,
  endereco?:IEndereco,
  status?:true
}
