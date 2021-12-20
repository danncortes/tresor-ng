import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {skip} from "rxjs/operators";

export interface ChipLog {
    add: string[];
    remove: string[];
}

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})

export class ChipsComponent implements OnInit {

    @Input() chips: string[];
    @Output() chipsChange = new EventEmitter<string[]>();
    @Output() logChanged = new EventEmitter<ChipLog>();
    public newChip: string;
    public log$: BehaviorSubject<ChipLog> = new BehaviorSubject<ChipLog>({add: [], remove: []})

    constructor() {
      this.newChip = '';
    }

    ngOnInit(): void {
        this.log$.pipe(skip(1)).subscribe(log => {
            this.logChanged.emit(log)
        })
    }

    public removeChip(index: number): void {
        const removedChip = this.chips[index]
        this.chips.splice(index, 1);
        this.chipsChange.emit(this.chips);
        this.updateLog(removedChip, 'remove')
    }

    public addChip(event: Event): void  {
      const target = event.target as HTMLInputElement;

      if(target.value.trim() && !(this.chips.includes(target.value))) {
        this.chips.push(target.value);
        this.chipsChange.emit(this.chips);
        this.newChip = '';
        this.updateLog(target.value, 'add')
      }
    }

    public updateLog(chip: string, task: 'add' | 'remove') {
        let newLog = this.log$.value;

        if(task === 'add') {
            if(newLog.remove.includes(chip)) {
                newLog.remove = newLog.remove.filter(_chip => _chip !== chip)
            } else {
                newLog.add.push(chip)
            }
        } else if(task === 'remove') {
            if(newLog.add.includes(chip)) {
                newLog.add = newLog.add.filter(_chip => _chip !== chip)
            } else {
                newLog.remove.push(chip)
            }
        }

        this.log$.next(newLog)
    }

}
