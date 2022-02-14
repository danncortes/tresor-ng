import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MyBtnModule } from 'my-workspace/dist/my-btn';
import { PruebaRoutingModule } from './prueba-routing.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from '../shared/shared.module';

function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'http://localhost:8080/api/labels/', '');
}

@NgModule({
  declarations: [ListComponent],
  imports: [
    SharedModule,
    CommonModule,
    TranslateModule,
    PruebaRoutingModule,
    MyBtnModule
  ],
  exports: [
    ListComponent
  ]
})
export class PruebaModule { }
