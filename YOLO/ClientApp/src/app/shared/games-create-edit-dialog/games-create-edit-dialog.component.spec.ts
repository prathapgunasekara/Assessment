import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CustomersCreateEditDialogComponent } from '../customers-create-edit-dialog/customers-create-edit-dialog.component';

import { GamesCreateEditDialogComponent } from './games-create-edit-dialog.component';

describe('GamesCreateEditDialogComponent', () => {
  let component: GamesCreateEditDialogComponent;
  let fixture: ComponentFixture<GamesCreateEditDialogComponent>;

  const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}), close: null });
  dialogRefSpyObj.componentInstance = { body: '' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomersCreateEditDialogComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule
      ],
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
    fixture = TestBed.createComponent(GamesCreateEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
