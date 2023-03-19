import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { CustomersCreateEditDialogComponent } from './customers-create-edit-dialog.component';

describe('CustomersCreateEditDialogComponent', () => {
  let component: CustomersCreateEditDialogComponent;
  let fixture: ComponentFixture<CustomersCreateEditDialogComponent>;

  const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}), close: null });
  dialogRefSpyObj.componentInstance = { body: '' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomersCreateEditDialogComponent],
      imports: [FormsModule, ReactiveFormsModule, MatDialogModule, MatInputModule, BrowserAnimationsModule],
      providers: [
        {
          provide: MatDialog,
          useValue: null
        },
        {
          provide: MatDialogRef,
          useValue: dialogRefSpyObj
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { isEdit: false, selectedCustomer: null }
        },
        {
          provide: FormBuilder
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomersCreateEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
