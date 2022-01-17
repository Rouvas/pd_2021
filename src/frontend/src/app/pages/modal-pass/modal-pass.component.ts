import { Component, OnInit, Input } from '@angular/core';
import {HttpService} from '../../services/http.service';
import {ToastrService} from 'ngx-toastr';
import {BsModalService} from 'ngx-bootstrap/modal';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-modal-pass',
  templateUrl: './modal-pass.component.html',
  styleUrls: ['./modal-pass.component.css']
})
export class ModalPassComponent implements OnInit {

  type = 0;

  @Input() getpass = {
    uniqueId: '',
    surname: '',
  };

  pass = {};

  statusCondition = 0;

  avalibleLocs = {
    bs: 0,
    pk: 0,
    av: 0,
    pr: 0
  };

  constructor(private srv: HttpService, private toastr: ToastrService,
              private modalService: BsModalService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    console.log(this.getpass);
    this.srv.checkPass(this.getpass).toPromise().then(res => {
      this.pass = res;
      this.type = res.type;
      for (const i of res.allowedLocations) {
        console.log(i);
        if (i === '0') {this.avalibleLocs.bs = 1; }
        if (i === '1') {this.avalibleLocs.pk = 1; }
        if (i === '2') {this.avalibleLocs.av = 1; }
        if (i === '3') {this.avalibleLocs.pr = 1; }
      }

      const getDate = {
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      };

      const endDate = {
        day: new Date(res.endDate).getDate(),
        month: new Date(res.endDate).getMonth() + 1,
        year: new Date(res.endDate).getFullYear(),
      };

      console.log(getDate);
      console.log(endDate);

      if (getDate.year <= endDate.year) {
        if (getDate.month <= endDate.month) {
          if (endDate.day >= getDate.day) {
            if (res.status === '1') {
              this.statusCondition = 1;
            }
          }
        }
      }
      this.spinner.hide();
    }).catch(
      err => {
        this.toastr.warning('Возникла ошибка! ' + err.error.message, 'Ошибка №' + err.status);
        this.modalService.hide();
        setInterval(res => this.spinner.hide(), 1000);
      }
      );
  }
}
