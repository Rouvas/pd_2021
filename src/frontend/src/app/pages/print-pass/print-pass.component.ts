import { Component, OnInit, Input } from '@angular/core';
import * as html2pdf from 'html2pdf.js';
import {HttpService} from '../../services/http.service';


@Component({
  selector: 'app-print-pass',
  templateUrl: './print-pass.component.html',
  styleUrls: ['./print-pass.component.css']
})
export class PrintPassComponent implements OnInit {

  @Input() type = 0;

  @Input() getpass = {
    uniqueId: '',
    surname: '',
  };

  pass = {
    uniqueId: '',
  };

  @Input() isModel = 0;

  @Input() print = false;

  avalibleLocs = {
    bs: 0,
    pk: 0,
    av: 0,
    pr: 0
  };



  constructor(private srv: HttpService) {
  }

  ngOnInit(): void {
    if (this.print === true) {
      this.srv.checkPass(this.getpass).toPromise().then(res => this.pass = res).then( res =>
        {
          for (const i of res.allowedLocations) {
            console.log(i);
            if (i === '0') {this.avalibleLocs.bs = 1; }
            if (i === '1') {this.avalibleLocs.pk = 1; }
            if (i === '2') {this.avalibleLocs.av = 1; }
            if (i === '3') {this.avalibleLocs.pr = 1; }
          }
          if (res.type === '0') {
          } else {
            this.type = 1;
          }
        }
      );
    }
  }

  // tslint:disable-next-line:typedef
  htmlPDF() {
    console.log(this.pass);
    if (this.type === 0) {
      this.printHtmlPDF();
    } else {
      this.printhtmlPDFcar();
    }
  }

  // tslint:disable-next-line:typedef
  printHtmlPDF() {
    const element = document.querySelector('.brd');
    const pdfStyle = {
      filename: 'Пропуск №' + this.pass.uniqueId + '.pdf',
    };
    html2pdf(element, pdfStyle);
  }
  // tslint:disable-next-line:typedef
  printhtmlPDFcar() {
    const element = document.querySelector('.brdcar');
    const pdfStyle = {
      filename: 'Пропуск №' + this.pass.uniqueId + '.pdf',
    };
    html2pdf(element, pdfStyle);
  }

}
