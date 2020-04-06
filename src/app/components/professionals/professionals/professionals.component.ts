import { Professional } from '../../../shared/Professional';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessionalService } from '../../../services/professional/professional.service';
import { from } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-professionals',
  templateUrl: './professionals.component.html',
  styleUrls: ['./professionals.component.sass']
})
export class ProfessionalsComponent implements OnInit {

  titulo = 'Professional List';
  displayedColumns: string[] = ['Id', 'Name', 'Email', 'Mobile', 'actions'];
  isLoadingResults = true;
  professionals: Professional[] = [];
  dataSource: MatTableDataSource<Professional>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: ProfessionalService,
    private router: Router) {

    this.dataSource = new MatTableDataSource(this.professionals);
  }

  add() {
    this.router.navigate(['/professionals-add']);
  }

  get() {
    this.api.get().subscribe(professionals => {
      this.dataSource.data = professionals;
      console.log(this.professionals);
      function sayHi() {
        alert('Hello');
      }
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
    });
  }

  delete(id: number) {
    if(confirm('Deseja excluir o registro?'))
    {
    this.api.remove(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/professionals']);
      }, (err) => {
        console.log(err);
      }
      );
    }
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
