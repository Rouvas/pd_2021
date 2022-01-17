import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';



@Component({
  selector: 'app-test-facility',
  templateUrl: './test-facility.component.html',
  styleUrls: ['./test-facility.component.css']
})
export class TestFacilityComponent implements OnInit {

  constructor(private toastr: ToastrService ) { }

  ngOnInit(): void {
  }

  queryNortification() {

  }

  pushNotification() {

  }

  pushToast() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

}
