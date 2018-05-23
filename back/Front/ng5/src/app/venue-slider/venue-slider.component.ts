import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-venue-slider',
  templateUrl: './venue-slider.component.html',
  styleUrls: ['./venue-slider.component.scss']
})
export class VenueSliderComponent implements OnInit {
  startingFrom = 0; // the first 5 bands
  cardsShown = 5; // The amount of cards to show
  contentType = 'venue'; // The type of things shown on cards
  current; // The current cards being displayed
  innerWidth; // Screen width in pixels

  cards = [
    {
      'name': 'Venue1',
      'thumbnail': '../../assets/images/venue1.jpg',
      'description': 'NIL are a band who like stuff and playing great'
    },
    {
      'name': 'Venue2',
      'thumbnail': '../../assets/images/venue2.jpg',
      'description': 'Venue2 are all about music and even more stuff'
    },
    {
      'name': 'NIL',
      'thumbnail': '../../assets/images/venue3.jpg',
      'description': 'Venue3 can\'t help themselves, they\'re just the best'
    },
    {
      'name': 'Venue4',
      'thumbnail': '../../assets/images/venue1.jpg',
      'description': 'Venue4 deliver non-stop action for a fraction of the cost'
    },
    {
      'name': 'SomeVenue',
      'thumbnail': '../../assets/images/venue2.jpg',
      'description': 'The toppest blokes in town'
    },
    {
      'name': 'MadChapz',
      'thumbnail': '../../assets/images/venue3.jpg',
      'description': 'Maddest Chapz'
    },
    {
      'name': 'Venueicoot',
      'thumbnail': '../../assets/images/venue1.jpg',
      'description': 'Venue pun'
    },
    {
      'name': 'VenueLands',
      'thumbnail': '../../assets/images/venue2.jpg',
      'description': 'lalallalallllaa'
    }
  ];

  calculateCardAmount() {
    this.innerWidth = window.screen.width;
    console.log('innerWidth: ' + innerWidth);
    this.current = this.cards.slice(0, this.cardsShown);
  }

  constructor() {
    this.calculateCardAmount();
  }

  ngOnInit() {
  }

  upByx(x) {
    this.startingFrom += x;
    if (this.startingFrom > this.cards.length - this.cardsShown) {
      this.startingFrom = this.cards.length - this.cardsShown;
    }
    this.current = this.cards.slice(this.startingFrom, this.startingFrom + this.cardsShown);
  }

  downByx(x) {
    this.startingFrom -= x;
    if (this.startingFrom < 0) {
      this.startingFrom = 0;
    }
    this.current = this.cards.slice(this.startingFrom, this.startingFrom + this.cardsShown);
  }
}
