import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {HttpService} from './services/http.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private titleService: Title, private spinner: NgxSpinnerService, private srv: HttpService) {}

  title = 'PolyPACS';

  // tslint:disable-next-line:typedef
  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();

    this.titleService.setTitle('PolyPACS ver.0.9 RC1');

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
  }

  // checkAccount() {
  //   console.log(localStorage.getItem('accessToken'));
  // }
  // getAccount() {
  //   this.srv.getUser(localStorage.getItem('accessToken'));
  // }
}

