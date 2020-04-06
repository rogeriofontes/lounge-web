import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../../services/task/task.service';
import { Task } from '../../../shared/Task';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Client } from 'src/app/shared/Client';
import { Job } from 'src/app/shared/Job';
import { ClientService } from 'src/app/services/client/client.service';
import { JobService } from 'src/app/services/job/job.service';

@Component({
  selector: 'app-tasks-add',
  templateUrl: './tasks-add.component.html',
  styleUrls: ['./tasks-add.component.sass']
})
export class TasksAddComponent implements OnInit {

  @Input() task = new Task();
  date: string;
  tasksForm: FormGroup;
  isLoadingResults = false;
  clients: Client[] = [];
  jobs: Job[] = [];
  matcher = new ErrorStateMatcher();
  
  constructor(private api: TaskService, 
              private clientApi: ClientService,
              private jobApi: JobService,
              private router: Router,
              private formBuilder: FormBuilder) { }
  
onFormSubmit(form:NgForm) {
  this.isLoadingResults = true;
  
  const { description, clientId, jobId, date } = this.tasksForm.value;
  this.task = new Task();
  this.task.description = description;
  this.task.date = date;
  this.task.clientId = clientId;
  this.task.jobId = jobId;

  this.api.add(this.task)
    .subscribe(res => {
        console.log(res);
        let id = res['id'];
        this.isLoadingResults = false;
        this.router.navigate(['/tasks-details', id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  } 

  add() {
    this.api.add(this.task).subscribe((res) => {
      this.router.navigate['/tasks'];
    }, (err) => {
        console.log(err);
    });
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

    this.tasksForm = this.formBuilder.group({
      'description' : [null, Validators.required],
      'clientId' : [null, Validators.required],
      'jobId' : [null, Validators.required],
      'date' : [null, Validators.required]
    });
  }
}