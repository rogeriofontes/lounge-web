import { Component, OnInit, Input } from '@angular/core';
import { JobService } from '../../../services/job/job.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Job } from '../../../shared/Job';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ManagerService } from 'src/app/services/manager/manager.service';
import { CompanyService } from 'src/app/services/company/company.service';
import { Company } from 'src/app/shared/Company';
import { Manager } from 'src/app/shared/Manager';
import { Professional } from 'src/app/shared/Professional';
import { ProfessionalService } from 'src/app/services/professional/professional.service';
import { Department } from 'src/app/shared/Department';
import { DepartmentService } from 'src/app/services/department/department.service';

@Component({
  selector: 'app-jobs-edit',
  templateUrl: './jobs-edit.component.html',
  styleUrls: ['./jobs-edit.component.sass']
})
export class JobsEditComponent implements OnInit {
  @Input() job = new Job();
  jobsForm: FormGroup;
  id:number;
  name:string='';
  date: string;
  companys: Company[] = [];
  professionals: Professional[] = [];
  isLoadingResults = false;
  matcher = new ErrorStateMatcher();

  constructor(private api: JobService,
              private companyApi: CompanyService,
              private professionalApi: ProfessionalService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    const { description, companyId, professionalId, date } = this.jobsForm.value;
    this.job = new Job();
    this.id = this.route.snapshot.params['id'];
    this.job.description = description;
    this.job.date = date;
    this.job.companyId = companyId;
    this.job.professionalId = professionalId;
  
    this.api.update(this.id, this.job)
        .subscribe(res => {
          let id = this.id;
          this.isLoadingResults = false;
          this.router.navigate(['/jobs-details', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  update() {
    this.api.update(this.route.snapshot.params['id'], this.job).subscribe((jobs) => {
      this.router.navigate(['/jobs-details/' + jobs.id]);
    }, (err) => {
      console.log(err);
    });
  }

  remove(id: number) {
    this.api.remove(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/jobs']);
      }, (err) => {
        console.log(err);
      }
    );  
  }

  jobDetails() {
    this.router.navigate(['/jobs-details', this.job.id]);
  }

  getCompanys(): any {
    this.companyApi.get().subscribe(companys => {
      this.companys = companys;
      console.log(this.companys);
      function sayHi() {
        alert('Hello');
      }
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
    });
  }

  getProfessionals(): any {
    this.professionalApi.get().subscribe(professionals => {
      this.professionals = professionals;
      console.log(this.professionals);
      function sayHi() {
        alert('Hello');
      }
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
    this.getCompanys();
    this.getProfessionals();

    this.api.getById(this.route.snapshot.params['id'])
    .subscribe((job: Job) => {
      console.log(job);
      this.job.id = job.id;
      this.job.description = job.description;
      this.job.date = job.date;
      this.job.companyId = job.companyId;
      this.job.professionalId = job.professionalId;

      this.jobsForm.setValue({
        description: job.description,
        date: job.date,
        companyId: job.companyId,
        professionalId: job.professionalId
      });
    });

    this.jobsForm = this.formBuilder.group({
      'description' : [null, Validators.required],
      'companyId' : [null, Validators.required],
      'professionalId' : [null, Validators.required],
      'date' : [null, Validators.required]
    });
  }
}
