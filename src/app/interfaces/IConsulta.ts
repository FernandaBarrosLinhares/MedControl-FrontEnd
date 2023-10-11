export default interface IConsulta {
	id?: number,
	nome: string,
	data: string,
	horario: string,
	descricao: string,
	idMedicacao:number,
	dosagem: string,
	status: boolean,
	idPaciente: number
}
