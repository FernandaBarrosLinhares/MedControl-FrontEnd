export default interface IEndereco{
  cep:string,
  cidade:string,
  estado:string,
  logradouro:string,
  numero:string,
  complemento?: string,
  bairro:string,
  referencia?:string
}
