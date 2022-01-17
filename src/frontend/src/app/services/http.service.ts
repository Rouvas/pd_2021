import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {LogincheckService} from './logincheck.service';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  uri = 'http://localhost:3000/api/';
  token;

  passes;
  passesT0;
  passesT1;
  passesT2;

  pass: any;

  constructor(private http: HttpClient, private router: Router,
              private toastr: ToastrService, private spinner: NgxSpinnerService,
              private lc: LogincheckService) { }


  login(login: string, password: string) {
    this.http.post(this.uri + 'auth/login/', {login, password})
      .toPromise().then( res => {
      console.log(res);
      this.lc.authState = true;
      // @ts-ignore
      localStorage.setItem('accessToken', res.accessToken);
        // @ts-ignore
      const token = jwt_decode(res.accessToken);
        // @ts-ignore
      if (token.role  === 'bureau') {
        this.router.navigate(['/bureau']);
        // @ts-ignore
      } else if (token.role === 'worker') {
        this.router.navigate(['/departament']);
        // @ts-ignore
      } else if (token.role === 'admin') {
        this.router.navigate(['/administrator']);
      }
      }
      ).catch(
        err => this.toastr.warning('Возникла ошибка! ' + err.error.message, 'Ошибка №' + err.status)
      );

  }

  logout(): void {
    const tokenData = localStorage.getItem('accessToken');
    console.log(tokenData);
    this.http.post(this.uri + 'auth/logout/', {} , {headers: {Authorization: 'Bearer ' + tokenData}}).toPromise().then(
      res => {
        console.log(res);
        localStorage.removeItem('accessToken');
      }
    ).catch(
      err => this.toastr.warning('Возникла ошибка при создании пропуска, проверьте поля ввода!', 'Ошибка №' + err.status)
    );
  }

  getUser(token: string): void{
    console.log(jwt_decode(localStorage.getItem('accessToken')));
  }

  createPass(pass: any){
    const tokenData = localStorage.getItem('accessToken');
    this.http.post(this.uri + 'pass/', pass, {headers: {Authorization: 'Bearer ' + tokenData}}).toPromise().then(
      res => console.log(res)
    ).catch(
      err => {
        console.log(err);
        this.toastr.warning('Возникла ошибка при создании пропуска, проверьте поля ввода!', 'Ошибка №' + err.status);
      }
    )
  }

  getPasses(){
    const tokenData = localStorage.getItem('accessToken');
    this.http.get(this.uri + 'pass/',  {headers: {Authorization: 'Bearer ' + tokenData}}).toPromise().then(
      res => {
        this.passes = res;
        this.passesT0 = this.passes;
        this.passesT0 = this.passesT0.filter(obj => obj.status === '0');
        this.passesT1 = this.passes;
        this.passesT1 = this.passesT1.filter(obj => obj.status === '1');
        this.passesT2 = this.passes;
        this.passesT2 = this.passesT2.filter(obj => obj.status === '2');
      }
    );
  }

  checkPassbyId(id: string): Observable<any[]> {
    return this.http.get(this.uri + 'pass/verify/' + id)
      .pipe(
        map( (data: any) => data)
      );
  }

  checkPass(pass) {
    console.log(pass);
    const obj = {
      surname: pass.surname,
      uniqueId: pass.uniqueId
    };
    console.log(obj);
    return this.http.post(this.uri + 'pass/verify-pass/', obj)
      .pipe(
        map( (data: any) => data)
      );
  }


}
