import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/';
import {MatIconModule} from '@angular/material/';
import {Router} from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder, FormGroupDirective, NgForm, AbstractControl} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import { Http, Headers} from '@angular/http';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {
  isChanged = false;
  title: String = 'Log In to BANDZ account';
  @Output() public openSubmitFormEvent = new EventEmitter();
  activeResetComponent = true;
  subscription: any;
  showError: Boolean;
  error: String;
  loginForm: any;
  resetForm: any;
  debouncer: any;
  constructor(
    private router: Router,
    private http: Http,
    private readonly formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService) {
    this.loginForm = formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]]
    }),
    this.resetForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email], this.checkIfUsernameExists.bind(this)]
    });
  }
  onSwap = false;
  trigger = false;
  @Output() public LoginEvent = new EventEmitter();

  closeLoginForm() {
    this.trigger = false;
    this.LoginEvent.emit(this.trigger);
    this.isChanged = false;
  }
  redirecttoSubmit() {
    // redirects the user to LoginForm
    this.closeLoginForm();
    this.onSwap = true;
    this.openSubmitFormEvent.emit(this.onSwap);
  }
  redirectToResetPass() {
    // redirects to the reset password Form
    this.title = 'Enter the email you use for Band\'s, and we’ll help you create a new password.';
    this.activeResetComponent = false;
    this.isChanged = true;
    return this.isChanged;

  }
  openSnackBar(msg: String, color: String) {
    // open Box that shows if the account has been been logged in
    this.snackBar.open( msg.toString() , 'Close', {
      duration: 3000,
      panelClass: [color.toString()]
    });
  }
  sendNewPassword(email: String) {
     // sends email
     this.http.get(
       `http://52.40.161.160:3000/users/sendPassword/${email}`
     )
     .map((data: any) => data.json())
     .subscribe(data => {
       this.closeLoginForm();
       this.openSnackBar(data.message, 'confirm');
     });
  }

  onLoginSubmit() {
    // when User click submit  and wants to login
    const user = {
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value
    };
    this.subscription = this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.openSnackBar('You have been logged in', 'confirm');
        this.router.navigate(['main']);
        this.closeLoginForm();
      } else {
        this.loginForm.reset();
        this.openSnackBar(data.message, 'warning');
      }
    });
  }
  checkIfUsernameExists(control: FormControl): any {
    // checks for username uniqness
    clearTimeout(this.debouncer);
     console.log(this.resetForm);
    return new Promise((resolve, reject) => {
      this.debouncer =  setTimeout(() => {
        this.authService.checkEmailNotTaken(control.value).subscribe((res) => {
          console.log(res);
          if (res.success === 'sucess') {
            resolve(null);
          }
        }, (err) => {
          resolve({'doesNotExist' : true});
        });
      }, 1000);
    });
  }
  ngOnInit() {
  }
  ngOnDestroy() {}

}
