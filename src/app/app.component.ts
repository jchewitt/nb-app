import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'notebook-challenge';
  constructor() {
  }

  ngOnInit() {
  }

  public setPage(pageNum: number) {
  }

  ngOnDestroy() {
  }

}
