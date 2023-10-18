export default interface IConsulta {
	id?: number,
	nome: string,
	data: string,
	horario: string,
	descricao: string,
	medicacao:string,
	dosagem: string,
	status: boolean,
  paciente: {
    id:number
  }
}
