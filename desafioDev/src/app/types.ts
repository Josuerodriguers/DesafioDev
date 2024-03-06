export interface FilterStatus {
    sessionToken: string;
    filterOrigemAtendimento: string;
    filterSituacao: string;
    filterUsuario: string;
    filteridPrioridade: string;
    filterIdSolicitacao: string;
    filterNota: string;
    p: number;
    itemsPerPage: number;
    column: string;
  }
  
  export const INITIAL_FILTER_STATUS: FilterStatus = {
    sessionToken: '',
    filterOrigemAtendimento: '',
    filterSituacao: '',
    filterUsuario: '',
    filteridPrioridade: '',
    filterIdSolicitacao: '',
    filterNota: '',
    p: 1,
    itemsPerPage: 10,
    column: ''
  };
  

  export const selectedFields: { [key: string]: boolean } = {
      Usuario: true,
      OrigemAtendimento: true,
      situacao: true,
      idsolicitacaoservico: true,
      idprioridade: true,
      nota: true,
    };