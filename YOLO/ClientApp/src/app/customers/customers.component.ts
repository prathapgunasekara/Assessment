import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { Customer } from '../models/customer.model';
import { CustomersService } from '../services/customers.service';
import { NotificationService } from '../services/notification.service';
import { CustomersCreateEditDialogComponent } from '../shared/customers-create-edit-dialog/customers-create-edit-dialog.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() public isLoading = new EventEmitter<boolean>();
  public displayedColumns: string[] = ['name', 'name', 'address', 'actions'];
  public filteredData = new MatTableDataSource<Customer>();
  public customerList: Customer[];
  private localSubscription = new Subscription();

  constructor(
    private customerService: CustomersService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}
  ngOnDestroy(): void {
    this.localSubscription.unsubscribe();
  }

  applyFilterToNameCategoryDescription(event: any) {
    console.log(this);
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.filteredData.data = this.filteredData.data.filter(
      (e) =>
        e.name.trim().toLowerCase().includes(filterValue) ||
        e.email.trim().toLowerCase().includes(filterValue) ||
        e.address.trim().toLowerCase().includes(filterValue)
    );
  }

  ngOnInit(): void {
    this.filteredData.paginator = this.paginator;

    this.localSubscription.add(
      this.customerService.getCustomers().subscribe((results: Customer[]) => {
        this.drawDataTable(results);
      })
    );
  }

  drawDataTable(results: Customer[]) {
    this.customerList = results;
    this.filteredData = new MatTableDataSource(results);
    this.filteredData.paginator = this.paginator;
    this.filteredData.sort = this.sort;
    this.isLoading.emit(false);
  }

  resetDataSource() {
    this.filteredData.data = this.customerList;
  }

  editCustomerDialogOpen(editableCustomer: Customer) {
    const dialogRef = this.dialog.open(CustomersCreateEditDialogComponent, {
      width: '450px',
      height: '400px',
      data: { isEdit: true, selectedCustomer: editableCustomer },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data.clicked === 'submit') {
        this.isLoading.emit(true);
        this.localSubscription.add(
          this.customerService.editCustomers(data.form).subscribe(
            (results) => {
              this.notificationService.success('Customer edited successfully');

              this.drawDataTable(results);
            },
            () => {
              this.notificationService.error('Customer edit failed');

              this.isLoading.emit(false);
            }
          )
        );
      }
    });
  }

  deleteCustomer(id: string) {
    this.isLoading.emit(true);
    this.customerService.deleteCustomers(id).subscribe(
      (results) => {
        this.notificationService.success('Customer deleted successfully');

        this.drawDataTable(results);
      },
      () => {
        this.notificationService.error('Customer delete failed');

        this.isLoading.emit(false);
      }
    );
  }

  addNewCustomer() {
    const dialogRef = this.dialog.open(CustomersCreateEditDialogComponent, {
      width: '450px',
      height: '500px',
      data: { isEdit: false, selectedCustomer: null },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data.clicked === 'submit') {
        this.isLoading.emit(true);
        this.localSubscription.add(
          this.customerService.addCustomers(data.form).subscribe(
            (results) => {
              this.notificationService.success('Customer added successfully');
              this.drawDataTable(results);
            },
            () => {
              this.notificationService.error('Customer add failed');

              this.isLoading.emit(false);
            }
          )
        );
      }
    });
  }
}
