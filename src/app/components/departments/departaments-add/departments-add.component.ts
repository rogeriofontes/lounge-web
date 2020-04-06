import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../../../services/department/department.service';
import { Department } from '../../../shared/Department';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CompanyService } from 'src/app/services/company/company.service';
import { Company } from 'src/app/shared/Company';
import { ManagerService } from 'src/app/services/manager/manager.service';
import { Manager } from 'src/app/shared/Manager';

@Component({
  selector: 'app-departments-add',
  templateUrl: './departments-add.component.html',
  styleUrls: ['./departments-add.component.sass']
})
export class DepartmentsAddComponent implements OnInit {

  @Input() department = new Department();
  departmentsForm: FormGroup;
  isLoadingResults = false;
  companys: Company[] = [];
  managers: Manager[] = [];
  matcher = new ErrorStateMatcher();
  
  constructor(private api: DepartmentService, 
              private companyApi: CompanyService,
              private managerApi: ManagerService,
              private router: Router,
              private formBuilder: FormBuilder) { }
  
onFormSubmit(form:NgForm) {
  this.isLoadingResults = true;
  
  const { description, leaderId, companyId } = this.departmentsForm.value;
  this.department = new Department();
  this.department.description = description;
  this.department.leaderId = leaderId;
  this.department.companyId = companyId;

  this.api.add(this.department)
    .subscribe(res => {
        console.log(res);
        let id = res['id'];
        this.isLoadingResults = false;
        this.router.navigate(['/departments-details', id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  } 

  add() {
    this.api.add(this.department).subscribe((res) => {
      this.router.navigate['/departments'];
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

  getManagers(): any {
    this.managerApi.get().subscribe(managers => {
      this.managers = managers;
      console.log(this.managers);
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
    this.getManagers();

    this.departmentsForm = this.formBuilder.group({
      'description' : [null, Validators.required],
      'leaderId' : [null, Validators.required],
      'companyId' : [null, Validators.required]
    });
  }
}