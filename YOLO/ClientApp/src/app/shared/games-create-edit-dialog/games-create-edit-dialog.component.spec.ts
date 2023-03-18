import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesCreateEditDialogComponent } from './games-create-edit-dialog.component';

describe('GamesCreateEditDialogComponent', () => {
  let component: GamesCreateEditDialogComponent;
  let fixture: ComponentFixture<GamesCreateEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesCreateEditDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesCreateEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
