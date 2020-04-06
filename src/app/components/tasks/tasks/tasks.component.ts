import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from '../../../shared/Task';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../services/task/task.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass']
})
export class TasksComponent implements OnInit {

  titulo = 'Company List';
  displayedColumns: string[] = ['Id', 'Description', 'TotalTask', 'actions'];
  isLoadingResults = true;
  tasks: Task[] = [];
  dataSource: MatTableDataSource<Task>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: TaskService,
    private router: Router) {

    this.dataSource = new MatTableDataSource(this.tasks);
  }

  add() {
    this.router.navigate(['/tasks-add']);
  }

  get() {
    this.api.get().subscribe(tasks => {
      this.dataSource.data = tasks;
      console.log(this.tasks);
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
        this.router.navigate(['/tasks']);
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
