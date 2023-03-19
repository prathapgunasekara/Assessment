import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatTableDataSource } from '@angular/material/table';
import { GamesService } from '../services/games.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { GamesCreateEditDialogComponent } from '../shared/games-create-edit-dialog/games-create-edit-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationService } from '../services/notification.service';
import { Game } from '../models/game.model';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit, OnDestroy {
  @Output() public isLoading = new EventEmitter<boolean>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public displayedColumns: string[] = [
    'name',
    'description',
    'category',
    'creationDate',
    'actions',
  ];
  public filteredData = new MatTableDataSource<Game>();
  public gamesList: Game[];
  private localSubscription = new Subscription();

  constructor(
    private gameService: GamesService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}
  ngOnDestroy(): void {
    this.localSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.filteredData.paginator = this.paginator;

    this.localSubscription.add(
      this.gameService.getGames().subscribe((results: Game[]) => {
        this.drawDataTable(results);
      })
    );
  }

  applyFilterToNameCategoryDescription(event: any) {
    console.log(this);
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.filteredData.data = this.filteredData.data.filter(
      (e) =>
        e.name.trim().toLowerCase().includes(filterValue) ||
        e.category.trim().toLowerCase().includes(filterValue) ||
        e.description.trim().toLowerCase().includes(filterValue)
    );
  }

  drawDataTable(results: Game[]) {
    this.gamesList = results;
    this.filteredData = new MatTableDataSource(results);
    this.filteredData.paginator = this.paginator;
    this.filteredData.sort = this.sort;
    this.isLoading.emit(false);
  }
  dateRangeChange(
    dateRangeStart: HTMLInputElement,
    dateRangeEnd: HTMLInputElement
  ) {
    if (dateRangeStart.value.length !== 0 && dateRangeEnd.value.length !== 0)
      this.filteredData.data = this.filteredData.data.filter((e) => {
        const compareDate = moment(
          moment(e.creationDate).format('DD/MM/YYYY'),
          'DD/MM/YYYY'
        );
        const startDate = moment(moment(dateRangeStart.value), 'DD/MM/YYYY');
        const endDate = moment(moment(dateRangeEnd.value), 'DD/MM/YYYY');
        console.log(compareDate.isBetween(startDate, endDate));

        return compareDate.isBetween(startDate, endDate);
      });
  }

  resetDataSource() {
    this.filteredData.data = this.gamesList;
  }

  editGameDialogOpen(editableGame: Game) {
    const dialogRef = this.dialog.open(GamesCreateEditDialogComponent, {
      width: '450px',
      height: '500px',
      data: { isEdit: true, selectedGame: editableGame },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data.clicked === 'submit') {
        this.isLoading.emit(true);
        this.localSubscription.add(
          this.gameService.editGames(data.form).subscribe(
            (results) => {
              this.notificationService.success('Game edited successfully');

              this.drawDataTable(results);
            },
            () => {
              this.notificationService.error('Game edit failed');

              this.isLoading.emit(false);
            }
          )
        );
      }
    });
  }

  deleteGame(id: string) {
    this.isLoading.emit(true);
    this.gameService.deleteGames(id).subscribe(
      (results) => {
        this.notificationService.success('Game deleted successfully');

        this.drawDataTable(results);
      },
      () => {
        this.notificationService.error('Game delete failed');

        this.isLoading.emit(false);
      }
    );
  }

  addNewGame() {
    const dialogRef = this.dialog.open(GamesCreateEditDialogComponent, {
      width: '450px',
      height: '500px',
      data: { isEdit: false, selectedGame: null },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data.clicked === 'submit') {
        this.isLoading.emit(true);
        this.localSubscription.add(
          this.gameService.addGames(data.form).subscribe(
            (results) => {
              this.notificationService.success('Game added successfully');
              this.drawDataTable(results);
            },
            () => {
              this.notificationService.error('Game add failed');

              this.isLoading.emit(false);
            }
          )
        );
      }
    });
  }
}
