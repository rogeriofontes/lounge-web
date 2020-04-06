import { Position } from '../../../shared/Position';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PositionService } from '../../../services/position/position.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.sass']
})
export class PositionsComponent implements OnInit {

  titulo = 'Company List';
  displayedColumns: string[] = ['Id', 'Description', 'TotalPosition', 'actions'];
  isLoadingResults = true;
  positions: Position[] = [];
  dataSource: MatTableDataSource<Position>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: PositionService,
    private router: Router) {

    this.dataSource = new MatTableDataSource(this.positions);
  }

  add() {
    this.router.navigate(['/positions-add']);
  }

  get() {
    this.api.get().subscribe(positions => {
      this.dataSource.data = positions;
      console.log(this.positions);
      function sayHi() {
        alert('Hello');
      }
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
    });
  }

  delete(id: number) {
    this.api.remove(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/positions']);
      }, (err) => {
        console.log(err);
      }
      );
  }

  /**
 * Set the paginator and sort after the view init since this component will
 * be able to query its view for the initialized paginator and sort.
 */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    console.log('');
    this.get();
  }

}
