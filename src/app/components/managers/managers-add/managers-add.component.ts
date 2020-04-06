import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerService } from '../../../services/manager/manager.service';
import { Manager } from '../../../shared/Manager';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Company } from 'src/app/shared/Company';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-managers-add',
  templateUrl: './managers-add.component.html',
  styleUrls: ['./managers-add.component.sass']
})
export class ManagersAddComponent implements OnInit {

  @Input() manager = new Manager(); 
  managersForm: FormGroup;
  isLoadingResults = false;
  companys: Company[] = [];
  matcher = new ErrorStateMatcher();

  constructor(private managerApi: ManagerService, 
              private companyApi: CompanyService, 
              private router: Router,
              private formBuilder: FormBuilder) { }
  
onFormSubmit(form:NgForm) {
  this.isLoadingResults = true;
  
  const { name, email, motherName, dateBirth, userId, phone, mobile, companyId, level } = this.managersForm.value;
  this.manager = new Manager();
  this.manager.name = name;
  this.manager.email = email;
  this.manager.motherName = motherName;
  this.manager.dateBirth = dateBirth;
  this.manager.userId = userId;
  this.manager.phone = phone;
  this.manager.mobile = mobile;
  this.manager.companyId = companyId;
  this.manager.level = level;

  this.managerApi.add(this.manager)
    .subscribe(res => {
        console.log(res);
        let id = res['id'];
        this.isLoadingResults = false;
        this.router.navigate(['/managers-details', id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  } 

  add() {
    this.managerApi.add(this.manager).subscribe((res) => {
      this.router.navigate['/managers'];
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

  ngOnInit() {
    this.getCompanys();
    
    this.managersForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'email' : [null, Validators.required],
      'motherName' : [null, Validators.required],
      'dateBirth' : [null, Validators.required],
      'userId' : [null, Validators.required],
      'phone' : [null, Validators.required],
      'mobile' : [null, Validators.required],
      'companyId' : [null, Validators.required],
      'level' : [null, Validators.required]
    });
  } 
}