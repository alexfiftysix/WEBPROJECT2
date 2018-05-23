import {Component, Input} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {MatSnackBarConfig} from '@angular/material';
import { AuthService} from '../services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(public snackBar: MatSnackBar) {
  }

  isSubmitActive = false;
  isLoginActive = false;
  isAccountChosen = false;
  accountType = '';
  title = 'app';
}
