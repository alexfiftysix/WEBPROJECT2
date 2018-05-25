import {Component, OnInit, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import {Http} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MatDialogRef} from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material';
import {AgmCoreModule} from '@agm/core';
import {MatButtonModule} from '@angular/material/button';
import {SuggestionsComponent} from '../front-view/suggestions/suggestions.component';
import {BandCardComponent} from '../front-view/band-card/band-card.component';
import {EventCardComponent} from '../front-view/event-card/event-card.component';
import {EventsDataService} from '../front-view/suggestions/events.service';
import {BandsDataService} from '../front-view/suggestions/bands.service';
import {IEvents} from '../../interfaces/IEvents';
import {ControlPosition} from '@agm/core/services/google-maps-types';
import * as $ from 'jquery';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {SliderModule} from 'primeng/slider';
import {EventSearchFilter} from '../../pipes/order-by-date.pipe';
import {Router} from '@angular/router';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {trigger, style, transition, animate, keyframes, query, stagger} from '@angular/animations';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
  providers: [],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [

        query(':enter', style({opacity: 0}), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 0, transform: 'translateX(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateX(35px)', offset: 0.3}),
            style({opacity: 1, transform: 'translateX(0)', offset: 1.0}),
          ]))]), {optional: true})
      ])
    ]),
    trigger('explainerAnim', [
      transition('* => *', [
        query('.paragraph', style({opacity: 0, transform: 'translateX(-40px)'})),

        query('.paragraph', stagger('500ms', [
          animate('800ms 1.2s ease-out', style({opacity: 1, transform: 'translateX(0)'})),
        ])),

        query('.paragraph', [
          animate(1000, style('*'))
        ])
      ])
    ])
  ]
})
export class MainViewComponent implements OnInit {
  dateInput = null;
  searchQuery = '';
  @ViewChild('picker') picker;
  @Input() selected: string;
  searching: Boolean = false;
  rangeValues: number[] = [0, 100];
  isButtonChangePickerActive = false;
  isValueSliderActive = false;
  latitude: Number = -27.46888;
  longitude: Number = 153.02122;
  public events;
  public bands;
  inputActive = false;
  active = false;
  markerActive = false;
  public fixed: Boolean = false;

  onMapReady(map) {
    map.setOptions({
      zoomControl: true,
      zoomControlOptions: {
        style: 'LARGE',
        position: ControlPosition.TOP_LEFT
      },
      streetViewControl: false
    });
  }

  changeActive() {
    this.inputActive = !this.inputActive;
  }

  isActive() {
    // Checks if the window is active
    return this.inputActive;
  }

  constructor(
    private router: Router,
    private eventService: EventsDataService,
    private bandsService: BandsDataService,
    private _HTTP: HttpClient
  ) {
  }

  ngOnInit() {
    if (localStorage.getItem('searchQueryBand') !== null) {
      const searchQuery = localStorage.getItem('searchQueryBand');
      this.getBands(searchQuery);
      localStorage.removeItem('searchQueryBand');
    } else if (localStorage.getItem('searchQuery') !== null) {
      const searchQuery = localStorage.getItem('searchQuery');
      this.getEvents(searchQuery);
      this.getBands(searchQuery);
      localStorage.removeItem('searchQuery');
    } else if (localStorage.getItem('searchQueryEvent') !== null) {
      const searchQuery = localStorage.getItem('searchQueryEvent');
      this.getEvents(searchQuery);
      localStorage.removeItem('searchQueryEvent');
    } else {
      this.getEvents('');
      this.getBands('');
    }
  }

  getBands(query: string) {
    this.searching = true;
    return this.bandsService.getBands(query).subscribe(data => {
        this.bands = data.bands;
        console.log(data);
      }, error => console.log(error),
      () => {
        this.searching = false;
        this.inputActive = false;
        console.log('Bands fetched completed');
      }
    );
  }

  getEvents(query: string) {
    this.searching = true;
    return this.eventService.getEvents(query).subscribe(data => {
        this.events = data.events;
        console.log(data);
      }, error => console.log(error),
      () => {
        this.searching = false;
        this.inputActive = false;
        console.log('Events fetched completed');
      });
  }

  getAll(query: string) {
    this.getBands(query);
    this.getEvents(query);
  }

  openDatePicker() {
    this.picker.open();
    this.isButtonChangePickerActive = true;
  }

  redirectToBandProfile(bandId) {
    this.router.navigate(['/bandDetails', bandId]);
  }

  redirectToEventProfile(eventId) {
    this.router.navigate(['/eventDetails', eventId]);
  }

  openValueSlider() {
    this.isValueSliderActive = true;
  }
}

@Component({
  selector: 'main-band-suggestions',
  templateUrl: '../front-view/band-card/band-card.component.html',
  styleUrls: ['./main-view.component.scss'],
  providers: []
})
export class MainBandSuggestionsComponent extends BandCardComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
  }
}

// Jquery operating the map changes when scrolling
let fixed = false;
$(document).scroll(function () {
  if ($(this).scrollTop() >= 200) {
    if (!fixed) {
      fixed = true;
      $('.mapContainer').removeClass('normal');
      $('.mapContainer').addClass('fixed'); // Or set top:20px; in CSS
    }
  } else {
    if (fixed) {
      fixed = false;
      $('.mapContainer').removeClass('fixed');
      $('.mapContainer').addClass('normal');
    }
  }
});
