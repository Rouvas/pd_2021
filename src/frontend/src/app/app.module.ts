import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

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

import {HttpClientModule} from '@angular/common/http';
import { AdminMainComponent } from './administrator/admin-main/admin-main.component';
import { PrintPassComponent } from './pages/print-pass/print-pass.component';
import { NewPassComponent } from './pages/new-pass/new-pass.component';
import { ModalPassComponent } from './pages/modal-pass/modal-pass.component';
import { UsersComponent } from './administrator/pages/users/users.component';
import { PassesComponent } from './administrator/pages/passes/passes.component';
import {FormsModule} from '@angular/forms';

import { NgxSpinnerModule } from 'ngx-spinner';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { TestFacilityComponent } from './testing/test-facility/test-facility.component';
import {PushNotificationsModule} from 'ng-push';
import { ToastrModule } from 'ngx-toastr';
import { ServiceWorkerModule } from '@angular/service-worker';
import { WelcomePageComponent } from './administrator/pages/welcome-page/welcome-page.component';
import { PassesTableComponent } from './pages/passes-table/passes-table.component';
import { WebpushesComponent } from './administrator/pages/webpushes/webpushes.component';
import {environment} from '../environments/environment.prod';
import { NewUserComponent } from './modals/new-user/new-user.component';
import { SelectorComponent } from './services/selector/selector.component';
import { NewUserPrintComponent } from './print/new-user-print/new-user-print.component';

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
    PassesComponent,
    NotfoundComponent,
    TestFacilityComponent,
    WelcomePageComponent,
    PassesTableComponent,
    WebpushesComponent,
    NewUserComponent,
    SelectorComponent,
    NewUserPrintComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot(),
    QRCodeModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: true}),
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: environment.production,
    //   // Register the ServiceWorker as soon as the app is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000'
    // })
  ],
  providers: [Title],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
