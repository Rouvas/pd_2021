import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {LoginComponent} from './auth/login/login.component';
import {VerifyPageComponent} from './pages/verify-page/verify-page.component';
import {WorkerMainComponent} from './worker/worker-main/worker-main.component';
import {BureauMainComponent} from './bureau/bureau-main/bureau-main.component';
import {AdminMainComponent} from './administrator/admin-main/admin-main.component';
import {PrintPassComponent} from './pages/print-pass/print-pass.component';
import {UsersComponent} from './administrator/pages/users/users.component';
import {PassesComponent} from './administrator/pages/passes/passes.component';

const routes: Routes = [
  {path: '', component: MainPageComponent},

  {path: 'login', component: LoginComponent},

  {path: 'verify-pass', component: VerifyPageComponent},
  {path: 'print-pass', component: PrintPassComponent},

  {path: 'departament', component: WorkerMainComponent},

  {path: 'bureau', component: BureauMainComponent},

  {path: 'administrator' , component: AdminMainComponent, children: [
      {path: 'users', component: UsersComponent},
      {path: 'passes', component: PassesComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
