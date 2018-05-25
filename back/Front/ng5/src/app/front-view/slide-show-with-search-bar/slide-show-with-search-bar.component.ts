import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import {MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {
  MAT_DIALOG_DATA
} from '@angular/material';
import {AgmCoreModule} from '@agm/core';

@Component({
  selector: 'app-slide-show-with-search-bar',
  templateUrl: './slide-show-with-search-bar.component.html',
  styleUrls: ['./slide-show-with-search-bar.component.scss']
})
export class SlideShowWithSearchBarComponent implements OnInit {
  inputActive = false;
  observable = Observable.interval(7000);
  timer;
  counter = 0;
  active = false;
  searchQuery = '';
  searchContent = [
    'Try "Bands in Brisbane"', 'Try "Jazz"', 'Try "Your favorite restaurant in area"', 'Try "Events in Sydney"'
  ];
  pathsArray = ['band2.jpg', 'band1.jpg', 'band3.jpg', 'band4.jpg'];

  redirectToMainPage(searchQuery) {
    localStorage.setItem('searchQuery', searchQuery);
    this.router.navigate(['/main']);
  }

  redirectToMainPageBandsOnly(searchQuery) {
    alert('band!');
    localStorage.setItem('searchQueryBand', searchQuery);
    this.router.navigate(['/main']);
  }

  redirectToMainPageEventsOnly(searchQuery) {
    localStorage.setItem('searchQueryEvent', searchQuery);
    this.router.navigate(['/main']);
  }

  changePhoto() {
    // Change the photo of the slideshow to the next one. Resets if it
    // exceed the array length.
    console.log(this.counter);
    this.counter++;
    if (this.counter >= this.pathsArray.length) {
      this.counter = 0;
    }
  }

  changeActive() {
    // When the user activates input. Show the additional window
    console.log('Yo clicked on this' + this.inputActive);
    this.inputActive = !this.inputActive;
  }

  isActive() {
    // Checks if the window is active
    return this.inputActive;
  }

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.timer = this.observable.subscribe(i => this.changePhoto());
  }

}
