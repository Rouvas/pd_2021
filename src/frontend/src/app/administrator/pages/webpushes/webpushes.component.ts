import { Component, OnInit } from '@angular/core';
import {SwPush} from '@angular/service-worker';
import {HttpService} from '../../../services/http.service';

@Component({
  selector: 'app-webpushes',
  templateUrl: './webpushes.component.html',
  styleUrls: ['./webpushes.component.css']
})
export class WebpushesComponent implements OnInit {


  readonly VAPID_PUBLIC_KEY = 'BLFC0iJNYgCAp53NHz_9ArVMpohkABNff6V96lfHqQ2irypqI8xW5CicrfKLRyf_iPVXda4XtWU2mj77T0TAVns';

  constructor(private swPush: SwPush, private srv: HttpService) { }

  ngOnInit(): void {
  }

  subscribeToNotifications(): void {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then(res => {
        this.srv.subscribePush(res);
      });
  }

}
