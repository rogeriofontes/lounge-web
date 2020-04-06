import { Component, OnInit } from '@angular/core';
import { JobService } from '../../../services/job/job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from 'src/app/shared/Job';
import { Department } from 'src/app/shared/Department';
import { DepartmentService } from 'src/app/services/department/department.service';
import { Professional } from 'src/app/shared/Professional';
import { ProfessionalService } from 'src/app/services/professional/professional.service';
import { CompanyService } from 'src/app/services/company/company.service';
import { Company } from 'src/app/shared/Company';

@Component({
  selector: 'app-jobs-details',
  templateUrl: './jobs-details.component.html',
  styleUrls: ['./jobs-details.component.sass']
})
export class JobsDetailsComponent implements OnInit {

  job = new Job();
  id: number;
  name: string;
  companyName: string;
  professionalName: string;
  isLoadingResults = true;
  constructor(private api: JobService, 
              private companyApi: CompanyService,
              private professionalApi: ProfessionalService,
              private router: Router,
              private route: ActivatedRoute) { }

   getCompanys(id: number): any {
      this.companyApi.getById(id).subscribe((company: Company) => {
        this.companyName = company.name;
        }, err => {
          console.log(err);
        });
  }
            
   getProfessionals(id: number): any {
      this.professionalApi.getById(id).subscribe((professional: Professional) => {
        this.professionalName = professional.name;
        }, err => {
          console.log(err);
        });
  }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.api.getById(id).subscribe((job: Job) => {
      console.log(job);
      this.job = job;
      this.getCompanys(job.companyId);
      this.getProfessionals(job.professionalId);
      this.isLoadingResults = false;
    });
  }
}
