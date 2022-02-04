import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})

export class ChipsComponent {

    @Input() chips: string[];
    @Input() allChips?: string[];
    @Output() chipsChange = new EventEmitter<string[]>();
    @ViewChild('input') public input: ElementRef<HTMLInputElement>;
    @ViewChildren('suggestionItem') public suggestionItem: QueryList<ElementRef>;
    public newChip: string;

    constructor() {
      this.newChip = '';
    }

    public get addButtonDisabled(): boolean {
      return !this.newChip.replace(/\s/g, '');
    }

    public get suggestedChips(): string[] {
      const value = this.newChip.replace(/\s/g, '').toLowerCase();
      if(this.allChips && this.newChip && value) {
        return this.allChips.filter(chip => chip.includes(value) && !this.chips.includes(chip));
      }
      return [];
    }

    public removeChip(index: number): void {
      this.chips.splice(index, 1);
      this.chipsChange.emit(this.chips);
    }

    public onEnterSpace(event: Event) {
      const target = event.target as HTMLInputElement;
      const { value } = target;
      this.addChip(value);
    }

    public addChip(value:string): void {
      value = value.replace(/\s/g, '').toLowerCase();

      if (value && !(this.chips.includes(value))) {
        this.chips.push(value);
        this.chipsChange.emit(this.chips);
        this.newChip = '';
        this.input.nativeElement.focus();
      }
    }

    public focusSuggestion() {
      const suggestionItems = this.suggestionItem.toArray() as ElementRef<HTMLLIElement>[];
      if(suggestionItems.length) {
        suggestionItems[0].nativeElement.focus();
      }
    }

    public focusUp(index: number) {
      const suggestionItems = this.suggestionItem.toArray() as ElementRef<HTMLLIElement>[];
      if(index > 0) {
        suggestionItems[index - 1].nativeElement.focus();
      } else {
        this.input.nativeElement.focus();
      }
    }

    public focusDown(index: number) {
      const suggestionItems = this.suggestionItem.toArray() as ElementRef<HTMLLIElement>[];
      if(index < suggestionItems.length - 1) {
        suggestionItems[index + 1].nativeElement.focus();
      }
    }
}
