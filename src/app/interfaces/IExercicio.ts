export interface IExercicio {
    id?: number,
	nome: string,
	data: string,
	horario: string,
	tipoExercicioEnum: string,
    quantidadePorSemana: number,
	descricao: string,
	status: boolean,
	paciente: {
		id:number
	  }
}
