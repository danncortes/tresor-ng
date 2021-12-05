import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-template',
  templateUrl: './main-template.component.html',
  styleUrls: ['./main-template.component.scss']
})
export class MainTemplateComponent {

  constructor(public router: Router) {

  }

  public isLoginRoute() {
    return this.router.url === '/login';
  }
}
