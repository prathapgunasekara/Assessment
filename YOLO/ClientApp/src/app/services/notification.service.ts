import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
  };

  constructor(public snackBar: MatSnackBar) {}
  success(message: string) {
    this.config.panelClass = ['success'];
    this.snackBar.open(message, '', this.config);
  }

  error(message: string) {
    this.config.panelClass = ['error'];
    this.snackBar.open(message, '', this.config);
  }
}
