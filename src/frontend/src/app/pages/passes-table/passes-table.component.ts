import {ChangeDetectorRef, Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {HttpService} from '../../services/http.service';
import {combineLatest, Subscription} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-passes-table',
  templateUrl: './passes-table.component.html',
  styleUrls: ['./passes-table.component.css']
})
export class PassesTableComponent implements OnInit {

  modalRef?: BsModalRef;

  subscriptions: Subscription[] = [];

  openedpass = true;

  getpass = {
    uniqueId: '',
    surname: '',
    status: '',
  };

  constructor(private modalService: BsModalService, public srv: HttpService,
              private changeDetection: ChangeDetectorRef, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.srv.getPasses();
  }

  openModal(template: TemplateRef<any>, surname, uniqueId, status): void {
    this.getpass.surname = surname;
    this.getpass.uniqueId = uniqueId;
    this.getpass.status = status;
    this.modalRef = this.modalService.show(template);
    // tslint:disable-next-line:variable-name
    let _combine;
    if (this.modalRef?.onHide && this.modalRef?.onHidden) {
      _combine = combineLatest(
        this.modalRef.onHide,
        this.modalRef.onHidden
      ).subscribe(() => this.changeDetection.markForCheck());
    }

    if (this.modalRef?.onHide) {
      this.subscriptions.push(
        this.modalRef.onHide.subscribe(() => {
          this.openedpass = true;
        })
      );
    }

    if  (this.modalRef?.onHidden) {
      this.subscriptions.push(
        this.modalRef.onHidden.subscribe(() => {
          this.openedpass = true;
          this.unsubscribe();
        })
      );
    }

    if (_combine) {
      this.subscriptions.push(_combine);
    }
  }

  // tslint:disable-next-line:typedef
  unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

}
