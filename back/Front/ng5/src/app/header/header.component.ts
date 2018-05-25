import {Component, OnInit, Inject, Input, HostListener, EventEmitter, Output, Injectable} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {SubmitFormComponent} from '../submit-form/submit-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/';
import {MatIconModule} from '@angular/material/';
import {Router} from '@angular/router';
import {FormControl, Validators, FormGroup, FormBuilder, FormGroupDirective, NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {CreateNewBandComponent} from '../create-new-band/create-new-band.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
@Injectable()
export class HeaderComponent implements OnInit {
  submitTrigger = false;
  loginTrigger = false;
  @Output() public SubmitEvent = new EventEmitter();
  @Output() public LoginEvent = new EventEmitter();

  openSubmitForm() {
    // sends an event emitter to the AppComponent to show the Submit window
    this.submitTrigger = true;
    this.SubmitEvent.emit(this.submitTrigger);
  }

  openLoginForm() {
    // sends an event emitter to the AppComponent to show the Login window
    this.loginTrigger = true;
    this.LoginEvent.emit(this.loginTrigger);
  }

  onLogout() {
    // ends the current user session and redirects him to mainpage
    this.authService.logout();
    this.snackBar.open('You have been logged out', 'Close', {
      duration: 3000,
      panelClass: ['confirm']
    });
    this.router.navigate(['#']);
    return false;
  }

  constructor(
    private router: Router,
    private readonly formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    public readonly authService: AuthService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
  }

  createBand() {
    const dialogRef = this.dialog.open(CreateNewBandComponent);
  }


}
