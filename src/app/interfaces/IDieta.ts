export interface IDieta {
  id?: number,
  nome: string,
  data: string,
  horario: string,
  tipo: string,
  descricao: string,
  status: boolean,
  paciente: number
}
