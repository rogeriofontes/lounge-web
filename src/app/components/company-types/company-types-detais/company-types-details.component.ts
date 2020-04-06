import { Component, OnInit } from '@angular/core';
import { CompanyTypeService } from '../../../services/company-type/company-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyType } from 'src/app/shared/CompanyType';

@Component({
  selector: 'app-company-types-details',
  templateUrl: './company-types-details.component.html',
  styleUrls: ['./company-types-details.component.sass']
})
export class CompanyTypesDetailsComponent implements OnInit {

  companyType = new CompanyType();
  id: number;
  name: string;
  isLoadingResults = true;
  constructor(private api: CompanyTypeService, 
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.api.getById(id).subscribe((companyType: CompanyType) => {
      console.log(companyType);
      this.companyType = companyType;
      this.isLoadingResults = false;
    });
  }
}
