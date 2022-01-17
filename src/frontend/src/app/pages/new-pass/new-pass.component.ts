import { Component, OnInit, Input } from '@angular/core';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-new-pass',
  templateUrl: './new-pass.component.html',
  styleUrls: ['./new-pass.component.css']
})
export class NewPassComponent implements OnInit {

  @Input() type = 0;

  pass = {
    surname: '',
    name: '',
    lastname: '',
    passport: '',
    goingTo: '',
    carPlate: null,
    date: '',
    endDate: '',
    type: '0',
    allowedLocations: []
  };

  allowedLocations = {
    bs: false,
    pk: false,
    pr: false,
    av: false
  };

  constructor(private srv: HttpService) { }

  ngOnInit(): void {
    console.log(this.type);
  }


  onCreatePass(): void {
    if (this.type === 0) { this.pass.type = '0'; } else { this.pass.type = '1'; }
    if (this.allowedLocations.bs === true) {
      this.pass.allowedLocations.push('0');
    }
    if (this.allowedLocations.pk === true) {
      this.pass.allowedLocations.push('1');
    }
    if (this.allowedLocations.pr === true) {
      this.pass.allowedLocations.push('3');
    }
    if (this.allowedLocations.av === true) {
      this.pass.allowedLocations.push('2');
    }
    console.log(this.pass);
    this.srv.createPass(this.pass);
  }

}
