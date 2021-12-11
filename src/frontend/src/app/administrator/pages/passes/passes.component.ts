import { Component, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-passes',
  templateUrl: './passes.component.html',
  styleUrls: ['./passes.component.css']
})
export class PassesComponent implements OnInit {
  modalRef?: BsModalRef;
  subscriptions: Subscription[] = [];

  openedpass = true;
  printeredpass = false;

  constructor(private modalService: BsModalService, private changeDetection: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }


  // Для модалок
  openModal(template: TemplateRef<any>) {

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
