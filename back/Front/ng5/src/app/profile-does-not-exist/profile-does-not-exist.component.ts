import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-profile-does-not-exist',
  templateUrl: './profile-does-not-exist.component.html',
  styleUrls: ['./profile-does-not-exist.component.scss']
})
export class ProfileDoesNotExistComponent implements OnInit {

  id: string;
  baseUrl: string;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    public dialogRef: MatDialogRef<ProfileDoesNotExistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    this.baseUrl = 'http://52.40.161.160:4200/#/bandDetails/'; //todo: Get this cleverly
    this.id = this.data['id'];
    this.router.navigateByUrl('');
  }

  cancelDialog() {
    this.dialogRef.close();
  }
}
