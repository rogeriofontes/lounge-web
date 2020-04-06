import { Component, OnInit, Input } from '@angular/core';
import { DepartmentService } from '../../../services/department/department.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Department } from '../../../shared/Department';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ManagerService } from 'src/app/services/manager/manager.service';
import { CompanyService } from 'src/app/services/company/company.service';
import { Company } from 'src/app/shared/Company';
import { Manager } from 'src/app/shared/Manager';

@Component({
  selector: 'app-departments-edit',
  templateUrl: './departments-edit.component.html',
  styleUrls: ['./departments-edit.component.sass']
})
export class DepartmentsEditComponent implements OnInit {
  @Input() department = new Department();
  departmentsForm: FormGroup;
  id:number;
  name:string='';
  companys: Company[] = [];
  managers: Manager[] = [];
  isLoadingResults = false;
  matcher = new ErrorStateMatcher();

  constructor(private api: DepartmentService,
              private companyApi: CompanyService,
              private managerApi: ManagerService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    const { description, leaderId, companyId } = this.departmentsForm.value;
    this.department = new Department();
    this.id = this.route.snapshot.params['id'];
    this.department.description = description;
    this.department.leaderId = leaderId;
    this.department.companyId = companyId;
  

    this.api.update(this.id, this.department)
        .subscribe(res => {
          let id = this.id;
          this.isLoadingResults = false;
          this.router.navigate(['/departments-details', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  update() {
    this.api.update(this.route.snapshot.params['id'], this.department).subscribe((departments) => {
      this.router.navigate(['/departments-details/' + departments.id]);
    }, (err) => {
      console.log(err);
    });
  }

  remove(id: number) {
    this.api.remove(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/departments']);
      }, (err) => {
        console.log(err);
      }
    );  
  }

  departmentDetails() {
    this.router.navigate(['/departments-details', this.department.id]);
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

    this.api.getById(this.route.snapshot.params['id'])
    .subscribe((department: Department) => {
      console.log(department);
      this.department.id = department.id;
      this.department.description = department.description;
      this.department.leaderId = department.leaderId;
      this.department.companyId = department.companyId;

      this.departmentsForm.setValue({
        description: department.description,
        leaderId: department.leaderId,
        companyId: department.companyId
      });
    });

    this.departmentsForm = this.formBuilder.group({
      'description' : [null, Validators.required],
      'leaderId' : [null, Validators.required],
      'companyId' : [null, Validators.required]
    });
  }
}
