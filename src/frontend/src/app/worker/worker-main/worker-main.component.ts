import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-worker-main',
  templateUrl: './worker-main.component.html',
  styleUrls: ['./worker-main.component.css']
})
export class WorkerMainComponent implements OnInit {

  modalRef?: BsModalRef;

  openedpass = true;

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }





}
