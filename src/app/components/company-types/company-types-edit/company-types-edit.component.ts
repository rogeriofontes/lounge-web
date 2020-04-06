import { Component, OnInit, Input } from '@angular/core';
import { CompanyTypeService } from '../../../services/company-type/company-type.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyType } from '../../../shared/CompanyType';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-company-types-edit',
  templateUrl: './company-types-edit.component.html',
  styleUrls: ['./company-types-edit.component.sass']
})
export class CompanyTypesEditComponent implements OnInit {
  @Input() companyType = new CompanyType();
  companyTypesForm: FormGroup;
  id:number;
  name:string='';
  isLoadingResults = false;
  matcher = new ErrorStateMatcher();

  constructor(private api: CompanyTypeService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    const { name } = this.companyTypesForm.value;
    this.companyType = new CompanyType();
    this.id = this.route.snapshot.params['id'];
    this.companyType.name = name;

    this.api.update(this.id, this.companyType)
        .subscribe(res => {
          let id = this.id;
          this.isLoadingResults = false;
          this.router.navigate(['/company-types-details', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  update() {
    this.api.update(this.route.snapshot.params['id'], this.companyType).subscribe((companyTypes) => {
      this.router.navigate(['/company-types-details/' + companyTypes.id]);
    }, (err) => {
      console.log(err);
    });
  }

  remove(id: number) {
    this.api.remove(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/company-types']);
      }, (err) => {
        console.log(err);
      }
    );  
  }

  companyTypeDetails() {
    this.router.navigate(['/company-types-details', this.companyType.id]);
  }

  ngOnInit() {
    this.api.getById(this.route.snapshot.params['id'])
    .subscribe((companyType: CompanyType) => {
      console.log(companyType);
      this.companyType.id = companyType.id;
      this.companyTypesForm.setValue({
        name: companyType.name
      });
    });

    this.companyTypesForm = this.formBuilder.group({
      'name' : [null, Validators.required]
    });
  }


}
