import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'alv-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss']
})
export class ScrollToTopComponent implements OnInit {

  constructor(private scrollingService: ScrollingServ) { }

  ngOnInit() {
  }

}
