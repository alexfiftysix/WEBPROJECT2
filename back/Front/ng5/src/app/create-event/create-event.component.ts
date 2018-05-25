import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  bandId: string; //id of band organizing event
  name: string = '';
  location: string = '';
  price: string = '';
  venue: string = '';
  banner: File = null;
  description: string = '';
  date: string = '';
  waiting: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    public dialogRef: MatDialogRef<CreateEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    this.bandId = this.data.id;
  }


  create() {
    this.waiting = true;
    const url = 'http://52.40.161.160:3000/events/'; //todo: get this better

    let body = new FormData();
    body.append('headlinerId', this.bandId);
    body.append('name', this.name);
    body.append('price', this.price);
    body.append('location', this.location);
    body.append('venueName', this.venue);
    body.append('image', this.banner);
    body.append('date', this.date);
    body.append('description', this.description);

    this.httpClient.post(url, body)
      .subscribe(data => {
          console.log("Success!");
          console.log(data);
          this.closeDialog();
        },
        error => {
          console.log("There was an error");
          console.log(error);
        }
      );
  }

  handleFileInput(files: FileList) {
    this.banner = files.item(0);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  formValid() {
    return this.textValid() &&
      this.priceValid() &&
      this.dateValid() &&
      this.imageValid();
  }

  textValid() {
    return this.name.length > 0 &&
      this.location.length > 0 &&
      this.venue.length > 0 &&
      this.description.length > 0 &&
      this.date.length > 0;
  }

  priceValid() {
    let priceNum = parseFloat(this.price);
    return !isNaN(priceNum) && priceNum >= 0 && priceNum <= 100;
  }

  dateValid() {
    return this.date.length > 0;
  }

  imageValid(){
    return this.banner != null;
  }
}
