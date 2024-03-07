import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ITickets } from '../../interface/ITickets';




@Component({
    selector: 'app-modal-content',
    template: `  
            <div class="modal-content">
      <div class="modal-header" >
        <h4 class="modal-title text-center"  >Detalhes do Ticket</h4>
        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss()"
  style="background-color: transparent; border: none; font-size: 1.5rem; outline: none; transition: color 0.3s ease;">
  <span aria-hidden="true" class="text-danger" style="font-size: 2rem;">&times;</span>
</button>

      </div>
      <div class="modal-body">
      <!-- <div class="modal-dialog modal-lg custom-modal-dialog" role="document"> -->
        <div class="row">
          <div class="col-md-3">
            <strong>Situação:</strong> {{ ticket.situacao }} <br/>
            <strong>Prioridade:</strong> {{ ticket.idprioridade }} <br/>
            <strong>Usuário:</strong> {{ ticket.Usuario }} <br/>
            <strong>Origem do Atendimento:</strong> {{ ticket.OrigemAtendimento }} <br/>
          </div>
          <div class="col-md-3">
            <strong>Data da Solicitação:</strong> {{ ticket.data_solicitacao }} <br/>
            <strong>Data Limite:</strong> {{ ticket.data_limit }} <br/>
            <strong>Nota do Atendimento:</strong> {{ ticket.nota }} <br/>
            <strong>Atividade:</strong> {{ ticket.Atividade }} <br/>
          </div>
          <div class="col-md-3">
            <strong>Descrição:</strong> {{ ticket.Descricao }} <br/>
            <strong>Tipo de Demanda:</strong> {{ ticket.tipoDemanda }} <br/>
            <strong>Serviço:</strong> {{ ticket.Servico }} <br/>
            <strong>Grupo Atual:</strong> {{ ticket.GrupoAtual }} <br/>
          </div>
          <div class="col-md-3">
            <strong>Contrato:</strong> {{ ticket.Contrato }} <br/>
          </div>
        </div>
      </div>
      </div>
    `
    ,
    styles: [`
      .modal-content {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        max-width: 600px;
        background-color: #fff;
        padding: 10px;
        border-radius: 10px;
        align-items: center;
        justify-content: center;
      }
    `]
  })
  export class ModalContentComponent {
      @Input() ticket!: ITickets;
    
      constructor(public activeModal: NgbActiveModal) {}
  }
  
