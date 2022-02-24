import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../services/session.service';
import {NbEntry} from "../types/notebook-entry";
import {FormControl} from "@angular/forms";
import {debounceTime, Subscription} from "rxjs";

@Component({
  selector: 'notebook-component',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.scss']
})
export class NotebookComponent implements OnInit {
  title = 'notebook-challenge';
  public entryText: FormControl = new FormControl();
  public entryTextSub: Subscription = new Subscription();
  public pageNum: number = 1;
  public maxPages: number = 5;
  public pageEntry: NbEntry = {
    page: 1,
    entry: ''
  };
  private routeSubscription: any;
  constructor(private sessionService: SessionService, private route: ActivatedRoute, private router: Router) {
    this.pageEntry = {
      page: this.pageNum,
      entry: ''
    }
  }

  ngOnInit() {
    this.entryTextSub = this.entryText.valueChanges.pipe(debounceTime(500)).subscribe(entry => {
      entry = entry || '';
      this.pageEntry.entry = entry;
      this.sessionService.saveEntry(this.pageEntry);
    });
    this.routeSubscription = this.route.queryParams.subscribe(params => {
      const uuid = params['sessionId'] || null;
      const id = this.sessionService.initApp(uuid);
      console.log(id);
      if (uuid === null) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            sessionId: id
          },
          queryParamsHandling: 'merge',
          // preserve the existing query params in the route
          skipLocationChange: false
          // do not trigger navigation
        });
      }
      this.setPage(1);
    });
  }

  public setPage(pageNum: number) {
    if (pageNum > this.maxPages) {
      pageNum = this.maxPages;
    } else if (pageNum < 1) {
      pageNum = 1;
    }
    this.pageNum = pageNum;
    this.pageEntry = this.sessionService.retrieveEntry(pageNum);
    this.entryText.setValue(this.pageEntry.entry);
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

}
