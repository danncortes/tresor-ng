import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  public filter = '';

  @Output() filterChanged: EventEmitter<string> = new EventEmitter<string>();

  clearFilter() {
    this.filter = '';
    this.filterChanged.emit('');
  }

  emitValue(value: any) {
    this.filterChanged.emit(value);
  }
}
