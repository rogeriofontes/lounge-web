import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyTypeService } from '../../../services/company-type/company-type.service';
import { CompanyType } from '../../../shared/CompanyType';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-company-types-add',
  templateUrl: './company-types-add.component.html',
  styleUrls: ['./company-types-add.component.sass']
})
export class CompanyTypesAddComponent implements OnInit {

  //Melhoria trazendo o Objeto
  @Input() companyType = new CompanyType(); //{id: '', nome: '', descricao: ''};
  name: string;
  companyTypesForm: FormGroup;
  isLoadingResults = false;
  matcher = new ErrorStateMatcher();
  
  constructor(private api: CompanyTypeService, 
              private router: Router,
              private formBuilder: FormBuilder) { }
  
onFormSubmit(form:NgForm) {
  this.isLoadingResults = true;
  
  const { name } = this.companyTypesForm.value;
  this.companyType = new CompanyType();
  this.companyType.name = name;

  this.api.add(this.companyType)
    .subscribe(res => {
        console.log(res);
        let id = res['id'];
        this.isLoadingResults = false;
        this.router.navigate(['/company-types-details', id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  } 

  add() {
    this.api.add(this.companyType).subscribe((res) => {
      this.router.navigate['/company-types'];
    }, (err) => {
        console.log(err);
    });
  }
  
  ngOnInit() {
    this.companyTypesForm = this.formBuilder.group({
      'name' : [null, Validators.required]
    });
  }
}
