declare var require: any;
import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/';
import { MatIconModule} from '@angular/material/';
import { FormControl, Validators, FormGroup, FormBuilder, FormGroupDirective, NgForm} from '@angular/forms';
import { ErrorStateMatcher} from '@angular/material/core';
import {MatDividerModule} from '@angular/material/divider';
import * as bar from '../../../node_modules/ng2-password-strength-bar/lib/passwordStrengthBar.component';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {AuthService} from '../../services/auth.service';
export class MyErrorStateMatcherComponent implements ErrorStateMatcher {
  // /** Error when invalid control is dirty, touched, or submitted. */
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-submission-form-next-step',
  templateUrl: './submission-form-next-step.component.html',
  styleUrls: ['./submission-form-next-step.component.scss']
})
export class SubmissionFormNextStepComponent implements OnInit {
  matcher = new MyErrorStateMatcherComponent();
  public onSwap = false;
  public account = {
    username: null,
    password: null
  };
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];
  // group of form controls
  public registrationForm: FormGroup;
  // checks for pattern => at least 1 letter, 1 number, 1 special
  private readonly emailRegex = '(?=\\D*\\d)(?=.*?[a-zA-Z]).*[\\W_].*';
  public isPasswordStrong;
  public trigger = false;
  @Input() accountType;
  @Output() public submitSecondStepEvent = new EventEmitter();
  @Output() public openLoginFormEvent2 = new EventEmitter();
  closeSecondSubmissionForm() {
    // closes SecondStep submission window
    this.trigger = false;
    this.submitSecondStepEvent.emit(this.trigger);
  }

  send() {
    // REGISTER USER
    const user = {
      username: this.account.username,
      password: this.account.password
    };
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.openSnackBar('User has been created', 'confirm');
      } else {
        this.openSnackBar(data.message, 'warning');
      }
    });
    this.closeSecondSubmissionForm();
    const isAccountCreated = true;
  }

  hasError(field: string, error: string) {
    // checks if the input is valid, return true if it's dirty(touched and then some input was typed)
    // , false if does not pass some of the validators
    const control = this.registrationForm.get(field);
    return control.hasError(error);
  }

  passwordMatchesEmail(passwordInput, emailInput) {
    // compare email input value with password input value.
    // return true if they are matched, false otherwise
    return (passwordInput === emailInput);
  }

  get email() {
    return this.registrationForm.get('email') as FormControl;
  }

  openSnackBar(msg: String, color: String) {
    // open Box that shows if the account has been created
    this.snackBar.open( msg.toString() , 'Close', {
      duration: 2000,
      panelClass: [color.toString()]
    });
  }
  redirecttoLogin() {
    // redirects the user to LoginForm
    this.closeSecondSubmissionForm();
    this.onSwap = true;
    this.openLoginFormEvent2.emit(this.onSwap);
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService) {
      this.isPasswordStrong = require('../../../node_modules/ng2-password-strength-bar/lib/passwordStrengthBar.component');
      this.registrationForm = formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30), Validators.pattern(this.emailRegex)]]
    });
  }
  ngOnInit() {}

}
