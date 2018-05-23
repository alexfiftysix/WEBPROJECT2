import {Component, OnInit, Input, Output} from '@angular/core';
import {BandCardComponent} from '../band-card/band-card.component';
import {EventCardComponent} from '../event-card/event-card.component';
import * as events from 'events';
import { EventsDataService } from './events.service';
import { BandsDataService } from './bands.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss'],
  providers: [EventsDataService]
})

export class SuggestionsComponent implements OnInit {
  constructor() {
    }

  ngOnInit() {
   }
}
