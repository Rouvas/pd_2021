import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {

  subEnabled = 'disabled';

  constructor() { }

  ngOnInit(): void {
    this.subEnabled = localStorage.getItem('web-push');
  }


}
