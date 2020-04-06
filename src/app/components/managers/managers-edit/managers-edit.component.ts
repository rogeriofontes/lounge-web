import { Component, OnInit, Input } from '@angular/core';
import { ManagerService } from '../../../services/manager/manager.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Manager } from '../../../shared/Manager';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Company } from 'src/app/shared/Company';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-managers-edit',
  templateUrl: './managers-edit.component.html',
  styleUrls: ['./managers-edit.component.sass']
})
export class ManagersEditComponent implements OnInit {
  @Input() manager = new Manager();
  id:number;
  managersForm: FormGroup;
  companys: Company[] = [];
  isLoadingResults = false;
  matcher = new ErrorStateMatcher();

  constructor(private api: ManagerService,
              private companyApi: CompanyService, 
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    const { name, email, motherName, dateBirth, userId, phone, mobile, companyId, level } = this.managersForm.value;
    this.manager = new Manager();
    this.id = this.route.snapshot.params['id'];
    this.manager.name = name;
    this.manager.email = email;
    this.manager.motherName = motherName;
    this.manager.dateBirth = dateBirth;
    this.manager.userId = userId;
    this.manager.phone = phone;
    this.manager.mobile = mobile;
    this.manager.companyId = companyId;
    this.manager.level = level;

    this.api.update(this.id, this.manager)
        .subscribe(res => {
          let id = this.id;
          this.isLoadingResults = false;
          this.router.navigate(['/managers-details', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  update() {
    this.api.update(this.route.snapshot.params['id'], this.manager).subscribe((managers) => {
      this.router.navigate(['/managers-details/' + managers.id]);
    }, (err) => {
      console.log(err);
    });
  }

  remove(id: number) {
    this.api.remove(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/managers']);
      }, (err) => {
        console.log(err);
      }
    );  
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

  managerDetails() {
    this.router.navigate(['/managers-details', this.manager.id]);
  }

  ngOnInit() {
    this.getCompanys();
    
    this.api.getById(this.route.snapshot.params['id'])
    .subscribe((manager: Manager) => {
      console.log(manager);
      this.manager.id = manager.id;
      this.manager.name = manager.name,
      this.manager.email = manager.email,
      this.manager.motherName = manager.motherName,
      this.manager.dateBirth = manager.dateBirth,
      this.manager.userId = manager.userId,
      this.manager.phone = manager.phone,
      this.manager.mobile = manager.mobile,
      this.manager.companyId = manager.companyId,
      this.manager.level = manager.level

      this.managersForm.setValue({
        name: manager.name,
        email: manager.email,
        motherName: manager.motherName,
        dateBirth: manager.dateBirth,
        userId: manager.userId,
        phone: manager.phone,
        mobile: manager.mobile,
        companyId: manager.companyId,
        level: manager.level
      });
    });

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
