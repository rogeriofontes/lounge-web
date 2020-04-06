import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../services/client/client.service';
import { Client } from '../../../shared/Client';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Company } from 'src/app/shared/Company';
import { CompanyService } from 'src/app/services/company/company.service';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-clients-add',
  templateUrl: './clients-add.component.html',
  styleUrls: ['./clients-add.component.sass']
})
export class ClientsAddComponent implements OnInit {

  @Input() client = new Client();
  clientsForm: FormGroup;
  isLoadingResults = false;
  companys: Company[] = [];
  matcher = new ErrorStateMatcher();
  
  constructor(private api:ClientService, 
              private companyApi: CompanyService,
              private router: Router,
              private formBuilder: FormBuilder) { }
  
onFormSubmit(form:NgForm) {
  this.isLoadingResults = true;
  
  const { name, email, mobile, phone, motherName, dateBirth, companyId, userId } = this.clientsForm.value;
  this.client = new Client();
  this.client.name = name;
  this.client.email = email;
  this.client.mobile = mobile;
  this.client.phone = phone;
  this.client.motherName = motherName;
  this.client.dateBirth = dateBirth;
  this.client.companyId = companyId;
  this.client.userId = userId;

  console.log(this.client);
  this.api.add(this.client)
    .subscribe(res => {
        console.log(res);
        let id = res['id'];
        this.isLoadingResults = false;
        this.router.navigate(['/clients-details', id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  } 

  add() {
    this.api.add(this.client).subscribe((res) => {
      this.router.navigate['/clients'];
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

    this.clientsForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'email' : [null, Validators.required],
      'phone' : [null, Validators.required],
      'mobile' : [null, Validators.required],
      'motherName' : [null, Validators.required],
      'dateBirth' : [null, Validators.required],
      'companyId' : [null, Validators.required],
      'userId' : [null, Validators.required]
    });

    
  }
}
