import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersCreateEditDialogComponent } from './customers-create-edit-dialog.component';

describe('CustomersCreateEditDialogComponent', () => {
  let component: CustomersCreateEditDialogComponent;
  let fixture: ComponentFixture<CustomersCreateEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersCreateEditDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersCreateEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
