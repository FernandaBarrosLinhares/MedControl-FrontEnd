export default interface IExame {
	id?: number,
	nome: string,
	data: string,
	horario: string,
	tipo: string,
	laboratorio: string,
	urlDocumento: string,
	resultados: string,
	status: boolean,
	idPaciente: number
}