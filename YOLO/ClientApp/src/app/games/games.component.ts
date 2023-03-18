import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
export class Game {
  id: string;
  name: string;
  description: string;
  category: string;
  creationDate: string;
}
import { MatTableDataSource } from '@angular/material/table';
import { GamesService } from '../services/games.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { GamesCreateEditDialogComponent } from '../shared/games-create-edit-dialog/games-create-edit-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit, OnDestroy {
  public isLoading = false;
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

  ngOnInit(): void {
    this.filteredData.paginator = this.paginator;

    this.localSubscription.add(
      this.gameService.getGames().subscribe((results: Game[]) => {
        this.drawDataTable(results);
      })
    );
  }

  drawDataTable(results: Game[]) {
    this.gamesList = results;
    this.filteredData = new MatTableDataSource(results);
    this.filteredData.paginator = this.paginator;
    this.filteredData.sort = this.sort;
    this.isLoading = false;
  }
  dateRangeChange(
    dateRangeStart: HTMLInputElement,
    dateRangeEnd: HTMLInputElement
  ) {
    if (dateRangeStart.value.length !== 0 && dateRangeEnd.value.length !== 0)
      this.filteredData.data = this.filteredData.data.filter((e) => {
        var compareDate = moment(
          moment(e.creationDate).format('DD/MM/YYYY'),
          'DD/MM/YYYY'
        );
        var startDate = moment(moment(dateRangeStart.value), 'DD/MM/YYYY');
        var endDate = moment(moment(dateRangeEnd.value), 'DD/MM/YYYY');
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
        this.isLoading = true;
        this.localSubscription.add(
          this.gameService.editGames(data.form).subscribe((results) => {
            this.notificationService.success('Game edited successfully');

            this.drawDataTable(results);
          })
        );
      }
    });
  }

  deleteGame(id: string) {
    this.isLoading = true;
    this.gameService.deleteGames(id).subscribe((results) => {
      this.notificationService.success('Game deleted successfully');

      this.drawDataTable(results);
    });
  }

  addNewGame() {
    const dialogRef = this.dialog.open(GamesCreateEditDialogComponent, {
      width: '450px',
      height: '500px',
      data: { isEdit: false, selectedGame: null },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data.clicked === 'submit') {
        this.isLoading = true;
        this.localSubscription.add(
          this.gameService.addGames(data.form).subscribe((results) => {
            this.notificationService.success('Game added successfully');
            this.drawDataTable(results);
          })
        );
      }
    });
  }
}
