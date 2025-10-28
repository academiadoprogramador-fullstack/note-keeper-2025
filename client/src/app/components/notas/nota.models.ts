export interface ListagemNotasApiResponse {
  registros: ListagemNotasModel[];
}

export interface ListagemNotasModel {
  id: string;
  titulo: string;
  conteudo: string;
  categoria: string;
}

export interface CadastrarNotaModel {
  titulo: string;
  conteudo: string;
}

export interface CadastrarNotaResponseModel {
  id: string;
}
