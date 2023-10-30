export default interface IDieta {
  id?: number,
  nome: string,
  data: string,
  horario: string,
  tipoDieta: string,
  descricao: string,
  status: boolean,
  paciente: {
    id: number
  }
}
