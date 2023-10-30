export default interface IConsulta {
	id?: number,
	motivo: string,
	data: string,
	horario: string,
	descricao: string,
	dosagensPrecaucoes: string,
	status: boolean,
  paciente: {
    id: number
  },
	usuario: {
		id: number
	},
	medicamento: {
		id: number,
		nome?: string
	}
}
