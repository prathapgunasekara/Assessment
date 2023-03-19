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
import { Game } from '../models/game.model';
import { CustomersService } from '../services/customers.service';
import { GamesService } from '../services/games.service';
import { NotificationService } from '../services/notification.service';
import { GamesCreateEditDialogComponent } from '../shared/games-create-edit-dialog/games-create-edit-dialog.component';

import { GamesComponent } from './games.component';

describe('CustomersComponent', () => {
  let component: GamesComponent;
  let fixture: ComponentFixture<GamesComponent>;
  const games: Game[] = [
    {
      id: '12345',
      category: 'war',
      creationDate: new Date().toString(),
      description: ' crypto war',
      name: 'war head'
    }
  ];
  const mockedGameService = jasmine.createSpyObj('CustomersService', [
    'addGames',
    'editGames',
    'deleteGames',
    'getGames'
  ]);
  mockedGameService.getGames.and.returnValue(of(games));
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
      declarations: [GamesComponent, GamesCreateEditDialogComponent],
      providers: [
        {
          provide: MatDialog,
          useValue: null
        },
        {
          provide: GamesService,
          useValue: mockedGameService
        },
        {
          providers: NotificationService,
          useValue: mockedNotificationService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
