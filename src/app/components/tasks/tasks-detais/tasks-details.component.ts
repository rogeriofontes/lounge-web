import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/shared/Task';
import { ClientService } from 'src/app/services/client/client.service';
import { JobService } from 'src/app/services/job/job.service';
import { Client } from 'src/app/shared/Client';
import { Job } from 'src/app/shared/Job';

@Component({
  selector: 'app-tasks-details',
  templateUrl: './tasks-details.component.html',
  styleUrls: ['./tasks-details.component.sass']
})
export class TasksDetailsComponent implements OnInit {

  task = new Task();
  id: number;
  name: string;
  clientName: string;
  jobDescription: string;
  isLoadingResults = true;
  constructor(private api: TaskService, 
              private clientApi: ClientService,
              private jobApi: JobService,
              private router: Router,
              private route: ActivatedRoute) { }

   getClients(id: number): any {
      this.clientApi.getById(id).subscribe((client: Client) => {
        this.clientName = client.name;
        }, err => {
          console.log(err);
        });
  }
            
   getJobs(id: number): any {
      this.jobApi.getById(id).subscribe((job: Job) => {
        this.jobDescription = job.description;
        }, err => {
          console.log(err);
        });
  }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.api.getById(id).subscribe((task: Task) => {
      console.log(task);
      this.task = task;
      this.getClients(task.clientId);
      this.getJobs(task.jobId);
      this.isLoadingResults = false;
    });
  }
}
