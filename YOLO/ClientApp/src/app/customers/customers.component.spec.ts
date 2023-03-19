import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Customer } from '../models/customer.model';
import { CustomersService } from '../services/customers.service';
import { NotificationService } from '../services/notification.service';
import { CustomersCreateEditDialogComponent } from '../shared/customers-create-edit-dialog/customers-create-edit-dialog.component';

import { CustomersComponent } from './customers.component';

describe('CustomersComponent', () => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;
  const customers: Customer[] = [
    {
      id: '123456',
      address: 'marine drive',
      email: 'sand@sd.com',
      name: 'sandy'
    }
  ];
  const mockedCustomerService = jasmine.createSpyObj('CustomersService', [
    'addCustomers',
    'editCustomers',
    'deleteCustomers',
    'getCustomers'
  ]);
  mockedCustomerService.getCustomers.and.returnValue(of(customers));
  const mockedNotificationService = jasmine.createSpyObj('NotificationService', ['success', 'error']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        HttpClientModule,
        FormsModule,
        MatGridListModule,
        MatMenuModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        HttpClientModule,
        MatDatepickerModule,
        MatRippleModule,
        MatNativeDateModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatSnackBarModule
      ],
      declarations: [CustomersComponent, CustomersCreateEditDialogComponent],
      providers: [
        {
          provide: MatDialog,
          useValue: null
        },
        {
          provide: CustomersService,
          useValue: mockedCustomerService
        },
        {
          providers: NotificationService,
          useValue: mockedNotificationService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
