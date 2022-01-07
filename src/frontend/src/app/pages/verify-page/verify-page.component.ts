import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-verify-page',
  templateUrl: './verify-page.component.html',
  styleUrls: ['./verify-page.component.css']
})
export class VerifyPageComponent implements OnInit {
  modalRef?: BsModalRef;
  verify = true;

  id: string;

  pass = {
    uniqueId: '',
    surname: ''
  };
  passinfo = {};

  constructor(private modalService: BsModalService, public srv: HttpService, private activateRoute: ActivatedRoute) {
    this.id = activateRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    // tslint:disable-next-line:triple-equals
    if (this.id != undefined) {
     this.srv.checkPassbyId(this.id).toPromise().then(res => {
       console.log(res);
       // @ts-ignore
       this.pass.uniqueId = res.uniqueId;
       // @ts-ignore
       this.pass.surname = res.surname;
     });

    }
  }


  // tslint:disable-next-line:typedef
  openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
  }
}
