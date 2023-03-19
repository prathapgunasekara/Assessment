import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from 'src/app/models/customer.model';
import { GamesCreateEditDialogComponent } from '../games-create-edit-dialog/games-create-edit-dialog.component';

@Component({
  selector: 'app-customers-create-edit-dialog',
  templateUrl: './customers-create-edit-dialog.component.html',
  styleUrls: ['./customers-create-edit-dialog.component.scss'],
})
export class CustomersCreateEditDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: { isEdit: boolean; selectedCustomer: Customer },
    public dialogRef: MatDialogRef<GamesCreateEditDialogComponent>
  ) {
    this.form = this.fb.group({
      id: ['00000000-0000-0000-0000-000000000000'],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    if (this.data.isEdit) {
      this.form.patchValue({
        id: this.data.selectedCustomer.id,
        name: this.data.selectedCustomer.name,
        email: this.data.selectedCustomer.email,
        address: this.data.selectedCustomer.address,
      });
    }
  }

  submit(form: NgForm) {
    this.dialogRef.close({
      clicked: 'submit',
      form: form,
    });
  }
}
