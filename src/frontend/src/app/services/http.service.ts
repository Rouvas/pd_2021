import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  uri = 'http://localhost:3000/api/';
  token;

  constructor(private http: HttpClient, private router: Router) { }

  // tslint:disable-next-line:typedef
  login(email: string, password: string) {
    this.http.post(this.uri + 'users/', {email, password})
      .subscribe((resp: any) => {

        // this.router.navigate(['profile']);
        localStorage.setItem('auth_token', resp.token);

      });

  }

}
