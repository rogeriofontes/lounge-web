import { CompanyType } from './../../../shared/CompanyType';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyTypeService } from '../../../services/company-type/company-type.service';
import { from } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-company-types',
  templateUrl: './company-types.component.html',
  styleUrls: ['./company-types.component.sass']
})
export class CompanyTypesComponent implements OnInit {

  titulo = 'Company List';
  displayedColumns: string[] = ['Id', 'Name', 'actions'];
  isLoadingResults = true;
  companyTypes: CompanyType[] = [];
  dataSource: MatTableDataSource<CompanyType>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private api: CompanyTypeService,
    private router: Router
    ) {
    this.dataSource = new MatTableDataSource(this.companyTypes);
    }

  add() {
    this.router.navigate(['/company-types-add']);
  }

  get() {
    this.api.get().subscribe(companyTypes => {
      this.dataSource.data = companyTypes;
      console.log(this.companyTypes);
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
        this.router.navigate(['/company-types']);
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
