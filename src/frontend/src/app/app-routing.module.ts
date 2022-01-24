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
import {NotfoundComponent} from './pages/notfound/notfound.component';

//Import guards

import {WorkerGuard} from './guards/worker.guard';
import {AdminGuard} from './guards/admin.guard';
import {BureauGuard} from './guards/bureau.guard';
import {TestFacilityComponent} from './testing/test-facility/test-facility.component';
import {WelcomePageComponent} from './administrator/pages/welcome-page/welcome-page.component';
import {PassesTableComponent} from './pages/passes-table/passes-table.component';
import {WebpushesComponent} from './administrator/pages/webpushes/webpushes.component';

const routes: Routes = [
  {path: '', component: MainPageComponent},

  {path: 'login', component: LoginComponent},

  {path: 'verify-pass', component: VerifyPageComponent},
  {path: 'verify-pass/id/:id', component: VerifyPageComponent},

  {path: 'print-pass', component: PrintPassComponent},

  {path: 'departament', component: WorkerMainComponent, canActivate: [WorkerGuard]},

  {path: 'bureau', component: BureauMainComponent, canActivate: [BureauGuard]},

  {path: 'administrator' , component: AdminMainComponent, canActivate: [AdminGuard], children: [
      {path: 'users', component: UsersComponent},
      {path: 'passes', component: PassesComponent},
      {path: 'web-push', component: WebpushesComponent},
      {path: '', component: WelcomePageComponent}
    ]},

  {path: 'test', component: TestFacilityComponent},
  {path: 'passes', component: PassesTableComponent},

  {path: '**', component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
