import { Component, EventEmitter, OnInit, Output } from '@angular/core';

enum Order {
  ASC = 'ascending',
  DESC = 'descending'
}

@Component({
  selector: 'alv-sort-button',
  templateUrl: './sort-button.component.html',
  styleUrls: ['./sort-button.component.scss']
})
export class SortButtonComponent implements OnInit {

  @Output()
  sortClicked = new EventEmitter<boolean>();

  isAscending = true;

  constructor() {
  }

  ngOnInit() {
  }

  onClick() {
    this.isAscending = !this.isAscending;
    this.sortClicked.emit(this.isAscending);
  }

}
