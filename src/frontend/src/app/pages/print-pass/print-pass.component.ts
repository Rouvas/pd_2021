import { Component, OnInit, Input } from '@angular/core';
import * as html2pdf from 'html2pdf.js';


@Component({
  selector: 'app-print-pass',
  templateUrl: './print-pass.component.html',
  styleUrls: ['./print-pass.component.css']
})
export class PrintPassComponent implements OnInit {

  @Input() type = 1;

  @Input() isModel = 0;

  @Input() print = false;

  constructor() {
  }

  ngOnInit(): void {
    if (this.print === true) {this.htmlPDF();}
  }

  // tslint:disable-next-line:typedef
  htmlPDF() {
    const element = document.querySelector('.brdcar');
    html2pdf(element);
  }


}
