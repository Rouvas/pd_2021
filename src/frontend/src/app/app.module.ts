import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { VerifyPageComponent } from './pages/verify-page/verify-page.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { WorkerMainComponent } from './worker/worker-main/worker-main.component';
import { BureauMainComponent } from './bureau/bureau-main/bureau-main.component';
import { HeaderComponent } from './modules/header/header.component';
import { FooterComponent } from './modules/footer/footer.component';


import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { QRCodeModule } from 'angularx-qrcode';

import { AdminMainComponent } from './administrator/admin-main/admin-main.component';
import { PrintPassComponent } from './pages/print-pass/print-pass.component';
import { NewPassComponent } from './pages/new-pass/new-pass.component';
import { ModalPassComponent } from './pages/modal-pass/modal-pass.component';
import { UsersComponent } from './administrator/pages/users/users.component';
import { PassesComponent } from './administrator/pages/passes/passes.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    VerifyPageComponent,
    LoginComponent,
    RegisterComponent,
    WorkerMainComponent,
    BureauMainComponent,
    HeaderComponent,
    FooterComponent,
    AdminMainComponent,
    PrintPassComponent,
    NewPassComponent,
    ModalPassComponent,
    UsersComponent,
    PassesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    QRCodeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
