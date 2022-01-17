import {Component, OnInit, Output} from '@angular/core';
import { HttpService } from '../../services/http.service';
import {LogincheckService} from '../../services/logincheck.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() authState = false;

  constructor(public srv: HttpService, private lc: LogincheckService) { }

  login = '';
  password = '';

  ngOnInit(): void {
  }

  onlogin() {
    this.srv.login(this.login, this.password);
  }


}
