import {Component, Input, OnInit} from '@angular/core';
import jwt_decode from 'jwt-decode';
import {Router} from '@angular/router';
import {HttpService} from '../../services/http.service';
import {LogincheckService} from '../../services/logincheck.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {



  constructor(private router: Router, private srv: HttpService, public lc: LogincheckService) { }

  ngOnInit(): void {
    if (localStorage.getItem('accessToken')) {
      this.lc.authState = !this.lc.authState;
    }
  }

  backCabinet() {
    let obj = jwt_decode(localStorage.getItem('accessToken'));
    // @ts-ignore
    let role = obj.role;

    if (role === 'admin') {
      this.router.navigate(['/administrator']);
    } else if (role === 'bureau') {
      this.router.navigate(['/bureau']);
    } else if (role === 'worker') {
      this.router.navigate(['/departament']);
    }

  }

  exitAccount() {
    this.srv.logout();
    this.lc.authState = false;
  }

}
