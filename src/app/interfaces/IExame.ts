export default interface IExame {
	id?: number,
	nome: string,
	data: string,
	horario: string,
	tipo: string,
	laboratorio: string,
	url_documento: string,
	resultado: string,
	status: boolean,
	paciente: {
		id: number
	}
}