import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-pass',
  templateUrl: './modal-pass.component.html',
  styleUrls: ['./modal-pass.component.css']
})
export class ModalPassComponent implements OnInit {

  @Input() type = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
