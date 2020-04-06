import { Address } from '../../../shared/Address';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from '../../../services/address/address.service';
import { from } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.sass']
})
export class AddressesComponent implements OnInit {

  titulo = 'Company List';
  displayedColumns: string[] = ['Id', 'Name', 'actions'];
  isLoadingResults = true;
  addresss: Address[] = [];
  dataSource: MatTableDataSource<Address>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private api: AddressService,
    private router: Router
    ) {
    this.dataSource = new MatTableDataSource(this.addresss);
    }

  add() {
    this.router.navigate(['/addresses-add']);
  }

  get() {
    this.api.get().subscribe(addresss => {
      this.dataSource.data = addresss;
      console.log(this.addresss);
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
        this.router.navigate(['/addresses']);
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
