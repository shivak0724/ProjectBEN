import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAddNewLinkReq = false;
  constructor() { }

  ngOnInit() {
    if (window.location.pathname !== "/") {
      this.isAddNewLinkReq = true;
    }
  }
}
