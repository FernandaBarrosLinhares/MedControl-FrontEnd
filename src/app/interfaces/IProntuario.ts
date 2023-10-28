import IConsulta from "./IConsulta";
import IDieta from "./IDieta";
import IExame from "./IExame";
import { IExercicio } from "./IExercicio";
import IMedicamentos from "./IMedicamentos";

export default interface IProntuario {
	consultas?: IConsulta[],
	dietas?: IDieta[],
	exames?: IExame[],
	exercicios?: IExercicio[],
	medicamentos?: IMedicamentos[]
}