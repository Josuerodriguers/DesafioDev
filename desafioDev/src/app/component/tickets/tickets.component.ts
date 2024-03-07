import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/authService';
import { FilterStatus, INITIAL_FILTER_STATUS, selectedFields } from './../../types';
import { ITickets } from '../../interface/ITickets';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from '../../component/tickets/ModalContentComponent';


@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['tickets.component.css'],
})

export class TicketsComponent implements OnInit {
  uniqueUsers: string[] = [];
  filter: FilterStatus = INITIAL_FILTER_STATUS;
  filteredTickets: ITickets[] = [];
  viewingTicketId: number | null = null;
  isDesc = false;
  column = '';
  uniqueIds: number[] = [];
  selectedFields = selectedFields;
  p: number = 1;
  optionsNota: string[] = ['Ruim', 'Regular', 'Bom', 'Ótimo', 'Sem Avaliação'];
  optionsSituacao: string[] = ['Em andamento', 'Fechada', 'Cancelada'];
  optionsOrigemAtendimento: string[] = [
    '2º Nível',
    '3º Nivel',
    'E-mail',
    'Facebook',
    'Internet',
    'Portal de Serviços',
    'Service Desk',
    'Twitter',
  ];
  showLogoutButton: boolean = false;

  get itemsPerPage(): number {
    return this.filter.itemsPerPage;
  }

  get filterSituacao(): string {
    return this.filter.filterSituacao;
  }

  set filterSituacao(value: string) {
    this.filter.filterSituacao = value;
  }

  get filterUsuario(): string {
    return this.filter.filterUsuario;
  }

  set filterUsuario(value: string) {
    this.filter.filterUsuario = value;
  }

  get filteridPrioridade(): string {
    return this.filter.filteridPrioridade;
  }

  set filteridPrioridade(value: string) {
    this.filter.filteridPrioridade = value;
  }

  get filterOrigemAtendimento(): string {
    return this.filter.filterOrigemAtendimento;
  }

  set filterOrigemAtendimento(value: string) {
    this.filter.filterOrigemAtendimento = value;
  }

  get filterIdSolicitacao(): string {
    return this.filter.filterIdSolicitacao;
  }

  set filterIdSolicitacao(value: string) {
    this.filter.filterIdSolicitacao = value;
  }

  get filterNota(): string {
    return this.filter.filterNota;
  }

  set filterNota(value: string) {
    this.filter.filterNota = value;
  }

  url = 'https://gsm-hmg.centralitcloud.com.br/citsmart/services/data/query';

  constructor(private http: HttpClient, private authService: AuthService,
    private modalService: NgbModal
    ) {}

  ngOnInit() {
    const sessionToken = this.authService.getSessionToken();
    if (sessionToken) {
      this.loadUniqueUsers(sessionToken);
    }
    this.showLogoutButton = true;
  }

  openModal(ticket: ITickets) {
    const modalRef = this.modalService.open(ModalContentComponent, { size: 'lg' });
    modalRef.componentInstance.ticket = ticket;
  }
  


  resetFilters(): void {
    this.filter = { ...INITIAL_FILTER_STATUS };
    this.filterUsuario = '';
    this.filteredTickets = [];
  }

  toggleView(ticketId: number): void {
    this.viewingTicketId = this.viewingTicketId === ticketId ? null : ticketId;
  }

  toggleDetails(ticket: ITickets): void {
    this.openModal(ticket);
  }
  

  sortTable(property: string): void {
    this.isDesc = !this.isDesc;
    this.column = property;
    let direction = this.isDesc ? 1 : -1;

    this.filteredTickets.sort((a: any, b: any) => {
      if (a[property] < b[property]) {
        return -1 * direction;
      } else if (a[property] > b[property]) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
  }

  loadUniqueUsers(sessionToken: string) {
    const body = {
      sessionID: sessionToken,
      queryName: 'DESAFIODEV',
      fields: ['Usuario'],
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http.post(this.url, body, { headers }).subscribe(
      (response: any) => {
        if (response && response.result && Array.isArray(response.result)) {
          const uniqueUserSet = new Set(
            response.result.map((ticket: any) => ticket.Usuario)
          );
          this.uniqueUsers = Array.from(uniqueUserSet) as string[];
        }
      },
      (error: any) => {
        console.log('Erro ao carregar usuários únicos: ', error);
      }
    );
  }

  postRequest() {
    const sessionToken = this.authService.getSessionToken();
    if (!sessionToken) {
      return;
    }
  
    const selectedFields = Object.keys(this.selectedFields).filter(
      (key: string) => this.selectedFields[key]
    );
  
    const body = {
      sessionID: sessionToken,
      queryName: 'DESAFIODEV',
      fields: selectedFields,
    };
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    this.http.post(this.url, body, { headers }).subscribe(
      (response: any) => {
        this.filteredTickets = response.result;
        this.applyFilters();
      },
      (error: any) => {
        console.log('Erro ao fazer requisição POST: ', error);
      }
    );
  }
  
  applyFilters(): void {
    const filters = [
      { property: 'situacao', value: this.filterSituacao },
      { property: 'idprioridade', value: this.filteridPrioridade },
      { property: 'Usuario', value: this.filterUsuario },
      { property: 'OrigemAtendimento', value: this.filterOrigemAtendimento },
      { property: 'idsolicitacaoservico', value: this.filterIdSolicitacao },
      { property: 'nota', value: this.filterNota },
    ];
  
    this.filteredTickets = this.filteredTickets.filter((ticket: any) => {
      return filters.every(filter => {
        if (filter.value) {
          if (filter.property === 'idprioridade' || filter.property === 'idsolicitacaoservico') {
            return ticket[filter.property] === parseInt(filter.value);
          }
          return ticket[filter.property] === filter.value;
        }
        return true;
      });
    });
  }
}