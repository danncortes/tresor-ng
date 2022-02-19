import { Injectable } from '@angular/core';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  public notifications: Notification[] = [];

  public notify(message: string, type: Notification['type'], duration = 2000) {
    const newNotification = new Notification(message, type, duration, 'active');
    this.notifications.push(newNotification);

    setTimeout(() => {
      this.notifications = this.notifications.filter(notification => notification !== newNotification);
    }, newNotification.duration + 800);

    setTimeout(() => {
      newNotification.status = 'closing';
    }, newNotification.duration);
  }
}
