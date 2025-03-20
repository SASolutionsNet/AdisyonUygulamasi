import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection!: HubConnection;
  private orderUpdateSubject = new Subject<{ table: string; totalCost: number }>();
  private tableClosedSubject = new Subject<string>();
  private apiUrl = `${environment.apiUrl}`; 

  constructor() { }

  // SignalR bağlantısını başlat ve belirtilen masanın grubuna katıl
  startConnection(table: string): void {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${this.apiUrl}/hubs/sales`)
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR bağlantısı kuruldu.');
        // Belirtilen masaya ait gruba katıl
        this.hubConnection.invoke('JoinTableGroup', table);
      })
      .catch((err) => console.error('SignalR bağlantısı kurulamadı: ', err));

    // Olayları dinle
    this.hubConnection.on('ReceiveOrderUpdate', (table: string, totalCost: number) => {
      this.orderUpdateSubject.next({ table, totalCost });
    });

    this.hubConnection.on('ReceiveTableClosed', (table: string) => {
      this.tableClosedSubject.next(table);
    });
  }

  orderUpdateReceived(): Observable<{ table: string; totalCost: number }> {
    return this.orderUpdateSubject.asObservable();
  }

  tableClosedReceived(): Observable<string> {
    return this.tableClosedSubject.asObservable();
  }

  // Masa kapatma sinyali göndermek için (örneğin closeTable butonuna tıklanırsa)
  closeTableSignal(table: string): void {
    if (this.hubConnection) {
      this.hubConnection.invoke('CloseTable', table)
        .catch(err => console.error('Masa kapatma sinyali gönderilemedi: ', err));
    }
  }

  stopConnection(): void {
    if (this.hubConnection) {
      this.hubConnection.stop().catch((err) =>
        console.error('SignalR bağlantısı sonlandırılamadı: ', err)
      );
    }
  }
}
