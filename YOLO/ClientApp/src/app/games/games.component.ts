import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  QueryList,
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

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'name',
    'description',
    'category',
    'creationDate',
  ];
  filteredData = new MatTableDataSource<Game>();
  gamesList: Game[];
  private localSubscription = new Subscription();
  /**
   *
   */
  constructor(private gameService: GamesService) {}
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
    this.localSubscription.add(
      this.gameService.getGames().subscribe((results) => {
        this.gamesList = results;
        this.filteredData = new MatTableDataSource(results);
      })
    );
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
}
