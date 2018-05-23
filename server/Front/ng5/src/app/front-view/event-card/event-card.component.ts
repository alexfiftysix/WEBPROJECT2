import { Component, OnInit, Input, Injectable } from '@angular/core';
import {EventsDataService} from '../suggestions/events.service';
import {SuggestionsComponent} from '../suggestions/suggestions.component';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MainViewComponent} from '../../main-view/main-view.component';
import { inherits } from 'util';
import { extend } from 'webdriver-js-extender';
@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
  providers: []
})
@Injectable()
export class EventCardComponent implements OnInit {
  @Input() event;
  ngOnInit() {}
  onChange() {
    console.log('change');
  }
  // getEvents() {
  //   return this.eventsService.getEvents().subscribe(data => {
  //     this.events = data.events;
  // });
}
