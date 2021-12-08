import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-new-pass',
  templateUrl: './new-pass.component.html',
  styleUrls: ['./new-pass.component.css']
})
export class NewPassComponent implements OnInit {

  @Input() type = 0;

  constructor() { }

  ngOnInit(): void {
    console.log(this.type);
  }

}
