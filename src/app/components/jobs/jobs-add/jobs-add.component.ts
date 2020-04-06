import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../../services/job/job.service';
import { Job } from '../../../shared/Job';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CompanyService } from 'src/app/services/company/company.service';
import { Company } from 'src/app/shared/Company';
import { ManagerService } from 'src/app/services/manager/manager.service';
import { Manager } from 'src/app/shared/Manager';
import { Professional } from 'src/app/shared/Professional';
import { ProfessionalService } from 'src/app/services/professional/professional.service';
import { Department } from 'src/app/shared/Department';
import { DepartmentService } from 'src/app/services/department/department.service';

@Component({
  selector: 'app-jobs-add',
  templateUrl: './jobs-add.component.html',
  styleUrls: ['./jobs-add.component.sass']
})
export class JobsAddComponent implements OnInit {

  @Input() job = new Job();
  date: string;
  jobsForm: FormGroup;
  isLoadingResults = false;
  companys: Company[] = [];
  professionals: Professional[] = [];
  matcher = new ErrorStateMatcher();
  
  constructor(private api: JobService, 
              private companyApi: CompanyService,
              private professionalApi: ProfessionalService,
              private router: Router,
              private formBuilder: FormBuilder) { }
  
onFormSubmit(form:NgForm) {
  this.isLoadingResults = true;
  
  const { description, companyId, professionalId, date } = this.jobsForm.value;
  this.job = new Job();
  this.job.description = description;
  this.job.date = date;
  this.job.companyId = companyId;
  this.job.professionalId = professionalId;

  this.api.add(this.job)
    .subscribe(res => {
        console.log(res);
        let id = res['id'];
        this.isLoadingResults = false;
        this.router.navigate(['/jobs-details', id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  } 

  add() {
    this.api.add(this.job).subscribe((res) => {
      this.router.navigate['/jobs'];
    }, (err) => {
        console.log(err);
    });
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

    this.jobsForm = this.formBuilder.group({
      'description' : [null, Validators.required],
      'professionalId' : [null, Validators.required],
      'companyId' : [null, Validators.required],
      'date' : [null, Validators.required]
    });
  }
}