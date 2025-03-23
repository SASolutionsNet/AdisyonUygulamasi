import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  private hubConnection!: signalR.HubConnection;
  private apiUrl = `${environment.apiUrl}/orderHub`;

  constructor() { }

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.apiUrl)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connected'))
      .catch(err => console.log('Error while starting SignalR:', err));
  }

  addOrderListener(callback: () => void) {
    this.hubConnection.on('ReceiveOrderUpdate', () => {
      callback();
    });
  }
}
