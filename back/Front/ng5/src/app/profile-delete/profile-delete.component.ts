import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-profile-delete',
  templateUrl: './profile-delete.component.html',
  styleUrls: ['./profile-delete.component.scss']
})
export class ProfileDeleteComponent implements OnInit {

  name: string;
  id: string;
  apiUrl: string;
  deleted = false;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    public dialogRef: MatDialogRef<ProfileDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.name = this.data['name'];
    this.id = this.data['id'];
    this.apiUrl = this.data['url'];
  }

  cancel() {
    this.dialogRef.close();
  }

  deleteProfile() {
    const url = this.apiUrl + this.id;
    this.httpClient.delete(url).subscribe(data => {
      console.log(data);
      this.router.navigateByUrl('');
      this.deleted = true;
    });
  }
}
