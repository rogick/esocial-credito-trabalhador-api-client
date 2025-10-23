
export enum ApiEndpoint {
  EnviarLote = 'enviar',
  ConsultarLote = 'consultar',
}

export interface Contrato {
  nrCpfTrabalhador: string;
  cdMatricula: string;
  tpInscricao: string;
  nrInscricao: string;
  nrContratoEmprestimo: string;
  nrInstituicaoFinanceira: string;
  vlParcela: string;
  nrCompetenciaDesconto: string;
  cdCategoria: string;
  dtInicioEmprestimo: string;
}

export interface EnviarLotePayload {
  nrLote: number;
  Lote: Contrato[];
}

export interface ApiResponse {
  type: string;
  title: string;
  status: number;
  details?: {
    Registro: string;
    Mensagem: string;
  }[];
  retornoLote?: Contrato[];
  traceId: string;
}

export interface ApiError {
  message: string;
  details?: any;
}
