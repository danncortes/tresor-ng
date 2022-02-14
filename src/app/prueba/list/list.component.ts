import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(public translateService: TranslateService) { }

  ngOnInit(): void {
    this.translateService.getTranslation('en').subscribe(translations => {
      this.translateService.setTranslation('en', translations);
      //this.btnService.setTranslations('en', translations);
    });
  }

}
