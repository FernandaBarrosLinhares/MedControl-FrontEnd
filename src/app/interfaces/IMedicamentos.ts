export default interface IMedicamentos {
	id?: number,
	nome: string,
	data: string,
	horario: string,
  tipo: string,
	quantidade:string,
	unidade: string,
  observacoes: string,
	status: boolean,
  paciente: {
    id:number
  }
}
