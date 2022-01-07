import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {error} from 'protractor';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';





@Injectable({
  providedIn: 'root'
})
export class HttpService {

  uri = 'http://localhost:3000/api/';
  token;

  pass: any;

  constructor(private http: HttpClient, private router: Router) { }


  login(login: string, password: string) {
    this.http.post(this.uri + 'auth/login/', {login, password})
      .toPromise().then( res =>
      // @ts-ignore
      localStorage.setItem('accessToken', res.accessToken)
      ).catch(
        err => console.log(err.error)
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
