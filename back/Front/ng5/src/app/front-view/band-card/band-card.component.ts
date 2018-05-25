import {Component, OnInit, Injectable, Input} from '@angular/core';
import {BandsDataService} from '../suggestions/bands.service';

@Component({
  selector: 'app-band-card',
  templateUrl: './band-card.component.html',
  styleUrls: ['./band-card.component.scss'],
  providers: [BandsDataService],
})
@Injectable()
export class BandCardComponent implements OnInit {
  @Input() band;
  constructor() {
  }

  ngOnInit() {
  }

}
