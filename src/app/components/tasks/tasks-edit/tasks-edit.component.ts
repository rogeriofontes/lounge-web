import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../../../services/task/task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Task } from '../../../shared/Task';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Client } from 'src/app/shared/Client';
import { Job } from 'src/app/shared/Job';
import { JobService } from 'src/app/services/job/job.service';
import { ClientService } from 'src/app/services/client/client.service';

@Component({
  selector: 'app-tasks-edit',
  templateUrl: './tasks-edit.component.html',
  styleUrls: ['./tasks-edit.component.sass']
})
export class TasksEditComponent implements OnInit {
  @Input() task = new Task();
  tasksForm: FormGroup;
  id:number;
  name:string='';
  date: string;
  clients: Client[] = [];
  jobs: Job[] = [];
  isLoadingResults = false;
  matcher = new ErrorStateMatcher();

  constructor(private api: TaskService,
              private clientApi: ClientService,
              private jobApi: JobService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    const { description, clientId, jobId, date } = this.tasksForm.value;
    this.task = new Task();
    this.id = this.route.snapshot.params['id'];
    this.task.description = description;
    this.task.date = date;
    this.task.clientId = clientId;
    this.task.jobId = jobId;
  
    this.api.update(this.id, this.task)
        .subscribe(res => {
          let id = this.id;
          this.isLoadingResults = false;
          this.router.navigate(['/tasks-details', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  update() {
    this.api.update(this.route.snapshot.params['id'], this.task).subscribe((tasks) => {
      this.router.navigate(['/tasks-details/' + tasks.id]);
    }, (err) => {
      console.log(err);
    });
  }

  remove(id: number) {
    this.api.remove(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/tasks']);
      }, (err) => {
        console.log(err);
      }
    );  
  }

  taskDetails() {
    this.router.navigate(['/tasks-details', this.task.id]);
  }

  getClients(): any {
    this.clientApi.get().subscribe(clients => {
      this.clients = clients;
      console.log(this.clients);
      function sayHi() {
        alert('Hello');
      }
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
    });
  }

  getJobs(): any {
    this.jobApi.get().subscribe(jobs => {
      this.jobs = jobs;
      console.log(this.jobs);
      function sayHi() {
        alert('Hello');
      }
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
    this.getClients();
    this.getJobs();

    this.api.getById(this.route.snapshot.params['id'])
    .subscribe((task: Task) => {
      console.log(task);
      this.task.id = task.id;
      this.task.description = task.description;
      this.task.date = task.date;
      this.task.clientId = task.clientId;
      this.task.jobId = task.jobId;

      this.tasksForm.setValue({
        description: task.description,
        date: task.date,
        clientId: task.clientId,
        jobId: task.jobId
      });
    });

    this.tasksForm = this.formBuilder.group({
      'description' : [null, Validators.required],
      'clientId' : [null, Validators.required],
      'jobId' : [null, Validators.required],
      'date' : [null, Validators.required]
    });
  }
}
