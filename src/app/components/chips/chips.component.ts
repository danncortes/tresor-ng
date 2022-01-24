import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})

export class ChipsComponent {

    @Input() chips: string[];
    @Output() chipsChange = new EventEmitter<string[]>();
    public newChip: string;

    constructor() {
      this.newChip = '';
    }

    public removeChip(index: number): void {
      this.chips.splice(index, 1);
      this.chipsChange.emit(this.chips);
    }

    public addChip(event: Event): void  {
      const target = event.target as HTMLInputElement;

      if(target.value.trim() && !(this.chips.includes(target.value))) {
        this.chips.push(target.value);
        this.chipsChange.emit(this.chips);
        this.newChip = '';
      }
    }
}
