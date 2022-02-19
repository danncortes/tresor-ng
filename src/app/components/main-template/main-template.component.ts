import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-main-template',
  templateUrl: './main-template.component.html',
  styleUrls: ['./main-template.component.scss']
})
export class MainTemplateComponent {

  constructor(public router: Router, public toastService: ToastService) {

  }

  public isLoginRoute() {
    return this.router.url === '/login';
  }

  public get showMenu():boolean {
    return this.router.url !== '/login';
  }

  public get notifications() {
    return this.toastService.notifications;
  }
}
