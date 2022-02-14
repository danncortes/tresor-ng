import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MyBtnModule } from 'my-workspace/dist/my-btn';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule,
    MyBtnModule
  ],
  exports: [
    TranslateModule
  ]
})
export class SharedModule { }
