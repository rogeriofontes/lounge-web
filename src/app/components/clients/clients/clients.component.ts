import { Client } from '../../../shared/Client';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../services/client/client.service';
import { from } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.sass']
})
export class ClientsComponent implements OnInit {

  titulo = 'Client List';
  displayedColumns: string[] = ['Id', 'Name', 'Email', 'Mobile', 'actions'];
  isLoadingResults = true;
  clients: Client[] = [];
  dataSource: MatTableDataSource<Client>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: ClientService,
    private router: Router) {

    this.dataSource = new MatTableDataSource(this.clients);
  }

  add() {
    this.router.navigate(['/clients-add']);
  }

  get() {
    this.api.get().subscribe(clients => {
      this.dataSource.data = clients;
      console.log(this.clients);
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
        this.router.navigate(['/clients']);
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
