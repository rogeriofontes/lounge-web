import { Company } from '../../../shared/Company';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../../services/company/company.service';
import { from } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-companys',
  templateUrl: './companys.component.html',
  styleUrls: ['./companys.component.sass']
})
export class CompanysComponent implements OnInit {

  titulo = 'Company List';
  displayedColumns : string[] = ['Id', 'Name', 'Phone', 'Email', 'actions'];
  isLoadingResults = true;
  companys: Company[] = [];
  dataSource: MatTableDataSource<Company>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private api: CompanyService,
              private router: Router) {
     
    this.dataSource = new MatTableDataSource(this.companys);
  }
 
  add() {
    this.router.navigate(['/companys-add']);
  }

  get() {
    this.api.get().subscribe(companys => {
        this.dataSource.data = companys;
        console.log(this.companys);
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
          this.get()
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
