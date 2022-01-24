import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import { transliterate as tr } from 'transliteration';
import * as html2pdf from 'html2pdf.js';
import {LogincheckService} from '../../services/logincheck.service';
import * as generator from 'generate-password-browser';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  userTypes = [
    {
      role: 'worker',
      name: 'Сотрудник'
    },
    {
      role: 'bureau',
      name: 'Сотрудник бюро'
    },
    {
      role: 'admin',
      name: 'Администратор'
    },
  ];

  // departments = [{
  //   name: 'Loading'
  // }];

  departments = [];

  selectedUserType = this.userTypes[0];

  selectUserDepartment;

  password = generator.generate({
    length: 8,
    numbers: true
  });

  user = {
    surname: '',
    name: '',
    lastname: '',
    role: this.userTypes[0].role,
    department: null,
    password: this.password,
    login: '',
  };

  constructor(public srv: HttpService, public lc: LogincheckService) { }

  ngOnInit(): void {
    this.getDepartments();
    this.lc.typeCheck = 0;
  }

  // tslint:disable-next-line:typedef
  getDepartments() {
    const tokenData = localStorage.getItem('accessToken');
    return this.srv.http.get(this.srv.uri + 'department', {headers: {Authorization: 'Bearer ' + tokenData}})
      .subscribe((data: any) =>
      {
        data.forEach(obj => {
          this.departments.push(obj);
          console.log(obj);
          this.selectUserDepartment = this.departments[1];
        });
      });
  }

  onCreateUser(): void {
    this.user.login = tr(this.user.name[0]) + '.' + tr(this.user.lastname[0]) + '.' + tr(this.user.surname);
    if (this.user.department === null) {
      this.user.department = this.departments[0].department;
    }
    this.srv.addUser(this.user);
  }

  onPrintUser(): void {
    const element = document.querySelector('.print-user');
    const pdfStyle = {
      filename: 'Аккаунт '
        + this.user.name[0] + '.'
        + this.user.lastname[0] + '.'
        + this.user.surname
        + '.pdf',
    };
    html2pdf(element, pdfStyle);
  }

  onChangeSelect(type: number, newObj): void {
    if (type === 0) {
      this.selectedUserType = newObj;
      console.log(newObj);
      this.user.role = newObj.role;
    } else {
      this.selectUserDepartment = newObj;
      this.user.department = newObj._id;
    }

  }

}
