import { Component, OnInit, Input } from '@angular/core';
import { ClientService } from '../../../services/client/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from '../../../shared/Client';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company/company.service';
import { Company } from 'src/app/shared/Company';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-clients-edit',
  templateUrl: './clients-edit.component.html',
  styleUrls: ['./clients-edit.component.sass']
})
export class ClientsEditComponent implements OnInit {
  @Input() client = new Client();
  clientsForm: FormGroup;
  id:number;
  isLoadingResults = false;
  companys: Company[] = [];
  matcher = new ErrorStateMatcher();
  
  constructor(private api: ClientService,
    private companyApi: CompanyService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    const { name, email, mobile, phone, motherName, dateBirth, companyId, userId } = this.clientsForm.value;
    this.client = new Client();
    this.id = this.route.snapshot.params['id'];
    this.client.name = name;
    this.client.email = email;
    this.client.mobile = mobile;
    this.client.phone = phone;
    this.client.motherName = motherName;
    this.client.dateBirth = dateBirth;
    this.client.companyId = companyId;
    this.client.userId = userId;
  

    this.api.update(this.id, this.client)
        .subscribe(res => {
          let id = this.id;
          this.isLoadingResults = false;
          this.router.navigate(['/clients-details', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  update() {
    this.api.update(this.route.snapshot.params['id'], this.client).subscribe((client) => {
      this.router.navigate(['/clients-details/' + client.id]);
    }, (err) => {
      console.log(err);
    });
  }

  remove(id: number) {
    this.api.remove(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/clients']);
      }, (err) => {
        console.log(err);
      }
    );  
  }

  clientDetails() {
    this.router.navigate(['/clients-details', this.client.id]);
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

    this.api.getById(this.route.snapshot.params['id'])
    .subscribe((client: Client) => {
      console.log(client);
      this.client.id = client.id;
      this.client.name = client.name;
      this.client.email = client.email;
      this.client.phone = client.phone;
      this.client.mobile = client.mobile;
      this.client.motherName = client.motherName;
      this.client.dateBirth = client.dateBirth;
      this.client.companyId = client.companyId;
      this.client.userId = client.userId;

      this.clientsForm.setValue({
        name: client.name,
        email: client.email,
        phone: client.phone,
        mobile: client.mobile,
        motherName: client.motherName,
        dateBirth: client.dateBirth,
        companyId: client.companyId,
        userId: client.userId
      });
    });

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
