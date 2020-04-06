import { Component, OnInit, ViewChild } from '@angular/core';
import { Job } from '../../../shared/Job';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../../services/job/job.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.sass']
})
export class JobsComponent implements OnInit {

  titulo = 'Company List';
  displayedColumns: string[] = ['Id', 'Description', 'TotalJob', 'actions'];
  isLoadingResults = true;
  jobs: Job[] = [];
  dataSource: MatTableDataSource<Job>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: JobService,
    private router: Router) {

    this.dataSource = new MatTableDataSource(this.jobs);
  }

  add() {
    this.router.navigate(['/jobs-add']);
  }

  get() {
    this.api.get().subscribe(jobs => {
      this.dataSource.data = jobs;
      console.log(this.jobs);
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
        this.router.navigate(['/jobs']);
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
