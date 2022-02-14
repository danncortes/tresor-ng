import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MyBtnService } from 'my-workspace/dist/my-btn';

@Component({
  selector: 'app-main-template',
  templateUrl: './main-template.component.html',
  styleUrls: ['./main-template.component.scss']
})
export class MainTemplateComponent implements OnInit{

  constructor(public router: Router, public translateService: TranslateService, public btnService: MyBtnService) {

  }

  ngOnInit() {
    // this.translateService.getTranslation('en').subscribe(translations => {
    //   this.translateService.setTranslation('en', translations);
    //   //this.btnService.setTranslations('en', translations);
    // });
  }

  public isLoginRoute() {
    return this.router.url === '/login';
  }

  public get showMenu():boolean {
    return this.router.url !== '/login';
  }
}
