import { Component, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { combineLatest, Subscription } from 'rxjs';
import {HttpService} from '../../../services/http.service';
import {error} from 'protractor';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  modalRef?: BsModalRef;
  subscriptions: Subscription[] = [];

  openedpass = true;
  printeredpass = false;

  users = [] as any;

  user = {
    surname: '',
    name: '',
    lastname: '',
    role: '',
    department: null,
    password: '',
    login: '',
  };

  openedUser;

  constructor(private modalService: BsModalService, private changeDetection: ChangeDetectorRef,
              public srv: HttpService
  ) {  }

  ngOnInit(): void {
    this.srv.getUsers()
      .subscribe(
      (data: any) =>
      {
        data.forEach((obj: any) => {
          // @ts-ignore
          // this.users.push(obj);
          this.users.push(obj);
          console.log(obj);
        });
      },
        err => {
        this.srv.kickUser();
      }
    );
  }


  // Для модалок
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openUserModal(user, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.user = user;
  }

  // tslint:disable-next-line:typedef
  unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }
}
