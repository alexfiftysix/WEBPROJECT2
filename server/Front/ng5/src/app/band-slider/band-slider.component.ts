import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-band-slider',
  templateUrl: './band-slider.component.html',
  styleUrls: ['./band-slider.component.scss']
})
export class BandSliderComponent implements OnInit {

  startingFrom = 0; // the first 5 bands
  cardsPerRow = 3; // The amount of cards to show
  amountOfRows = 2; // How many rows of images
  contentType = 'band'; // The type of things shown on cards
  innerWidth; // screen width
  cardsDisplayed; // The first row of cards being displayed
  idealCardWidth = 320;
  cardActualWidth = 300;
  rowsDrawn = 1;

  cards = [
    {
      'name': 'Band1',
      'thumbnail': '../../assets/images/band1.jpg',
      'description': 'NIL are a band who like stuff and playing great'
    },
    {
      'name': 'Band2',
      'thumbnail': '../../assets/images/band2.jpg',
      'description': 'Band2 are all about music and even more stuff'
    },
    {
      'name': 'NIL',
      'thumbnail': '../../assets/images/band3.jpg',
      'description': 'Band3 can\'t help themselves, they\'re just the best'
    },
    {
      'name': 'Band4',
      'thumbnail': '../../assets/images/band4.jpg',
      'description': 'Band4 deliver non-stop action for a fraction of the cost'
    },
    {
      'name': 'SomeBand',
      'thumbnail': '../../assets/images/band5.jpg',
      'description': 'The toppest blokes in town'
    },
    {
      'name': 'MadChapz',
      'thumbnail': '../../assets/images/band1.jpg',
      'description': 'Maddest Chapz'
    },
    {
      'name': 'Bandicoot',
      'thumbnail': '../../assets/images/band2.jpg',
      'description': 'Band pun'
    },
    {
      'name': 'BandLands',
      'thumbnail': '../../assets/images/band3.jpg',
      'description': 'lalallalallllaa'
    },
    {
      'name': 'XMPL',
      'thumbnail': 'https://www.slinky.com.au/wp-content/uploads/2016/08/Live-Band.jpg',
      'description': 'huihuihui'
    },
    {
      'name': 'Band1',
      'thumbnail': '../../assets/images/band1.jpg',
      'description': 'NIL are a band who like stuff and playing great'
    },
    {
      'name': 'Band2',
      'thumbnail': '../../assets/images/band2.jpg',
      'description': 'Band2 are all about music and even more stuff'
    },
    {
      'name': 'NIL',
      'thumbnail': '../../assets/images/band3.jpg',
      'description': 'Band3 can\'t help themselves, they\'re just the best'
    },
    {
      'name': 'Band4',
      'thumbnail': '../../assets/images/band4.jpg',
      'description': 'Band4 deliver non-stop action for a fraction of the cost'
    },
    {
      'name': 'SomeBand',
      'thumbnail': '../../assets/images/band5.jpg',
      'description': 'The toppest blokes in town'
    },
    {
      'name': 'MadChapz',
      'thumbnail': '../../assets/images/band1.jpg',
      'description': 'Maddest Chapz'
    },
    {
      'name': 'Bandicoot',
      'thumbnail': '../../assets/images/band2.jpg',
      'description': 'Band pun'
    },
    {
      'name': 'BandLands',
      'thumbnail': '../../assets/images/band3.jpg',
      'description': 'lalallalallllaa'
    },
    {
      'name': 'XMPL',
      'thumbnail': 'https://www.slinky.com.au/wp-content/uploads/2016/08/Live-Band.jpg',
      'description': 'huihuihui'
    }
  ];

  calculateCardsPerRow() {
    this.innerWidth = document.getElementById('main').clientWidth;
    console.log('innerWidth: ' + innerWidth);
    this.cardsPerRow = Math.floor(this.innerWidth / this.idealCardWidth); // 320 px per card inc margin ideal
    console.log('innerWidth: ' + this.innerWidth + '. innerWidth / ' + this.idealCardWidth +
      ': ' + innerWidth / this.idealCardWidth + '. Cards per row: ' + this.cardsPerRow);
    console.log('Artist Cards per row: ' + this.cardsPerRow);

    this.cardActualWidth = innerWidth / this.cardsPerRow - 50;
    // document.getElementById('card-width').style.cssText = '--card-width: ' + this.cardActualWidth + ';';

    console.log((innerWidth / this.cardsPerRow) - 150);

    // Add empty elements to array to ensure left-align on last line
    while (this.cards.length % this.cardsPerRow !== 0) {
      this.cards.push({'name': '', 'thumbnail': '', 'description': ''});
    }
    this.fillFirstLine();
  }

  fillFirstLine() {
    this.cardsDisplayed = this.cards.slice(0, this.cardsPerRow);
  }

  constructor() {
    this.calculateCardsPerRow();
  }


  ngOnInit() {
  }

  upByx(x) {
    this.startingFrom += x;
    if (this.startingFrom > this.cards.length - this.cardsPerRow * this.amountOfRows) {
      this.startingFrom = this.cards.length - this.cardsPerRow * this.amountOfRows;
    }
    this.cardsDisplayed = this.cards.slice(this.startingFrom, this.startingFrom + this.cardsPerRow);
  }

  downByx(x) {
    this.startingFrom -= x;
    if (this.startingFrom < 0) {
      this.startingFrom = 0;
    }
    this.cardsDisplayed = this.cards.slice(this.startingFrom, this.startingFrom + this.cardsPerRow);
  }

  drawNextRow() {
    this.rowsDrawn++;
    this.cardsDisplayed = this.cards.slice(0, this.cardsPerRow * this.rowsDrawn);
  }
}
