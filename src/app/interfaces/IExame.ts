export default interface IExame {
	id?: number,
	nome: string,
	data: string,
	horario: string,
	tipo: string,
	laboratorio: string,
	urlDocumento: string,
	resultado: string,
	status: boolean,
	paciente: {
		id: number
	}
}