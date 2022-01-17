import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-worker-main',
  templateUrl: './worker-main.component.html',
  styleUrls: ['./worker-main.component.css']
})
export class WorkerMainComponent implements OnInit {

  modalRef?: BsModalRef;

  openedpass = true;

  getpass = {
    uniqueId: '',
    surname: '',
  };

  constructor(private modalService: BsModalService, public srv: HttpService) { }

  ngOnInit(): void {
    this.srv.getPasses();
  }

  // tslint:disable-next-line:typedef
  openModal(template: TemplateRef<any>, surname, uniqueId) {
    this.modalRef = this.modalService.show(template);
    this.getpass.surname = surname;
    this.getpass.uniqueId = uniqueId;
  }

  // tslint:disable-next-line:typedef
  openModal2(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }






}
