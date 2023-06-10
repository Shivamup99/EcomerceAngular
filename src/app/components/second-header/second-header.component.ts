import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-second-header',
  templateUrl: './second-header.component.html',
  styleUrls: ['./second-header.component.css'],
})
export class SecondHeaderComponent {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();

  sort = 'desc';
  itemShowCount = 12;

  onUpdateSort(newSort: string) {
    this.sort = newSort;
    this.sortChange.emit(newSort)
  }
  onCountUpdate(count: number) {
    this.itemShowCount = count;
    this.itemCountChange.emit(count)
  }
  onColumnsUpdated(colNum: number): void {
    this.columnsCountChange.emit(colNum);
  }
}
