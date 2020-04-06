import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../services/company/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/shared/Company';
import { Address } from 'src/app/shared/Address';
import { CompanyType } from 'src/app/shared/CompanyType';
import { CompanyTypeService } from 'src/app/services/company-type/company-type.service';
import { AddressService } from 'src/app/services/address/address.service';
import { Observable } from 'rxjs/internal/Observable';
import { DocumentRegionService } from 'src/app/services/document-region/document-region.service';
import { PersonTypeService } from 'src/app/services/person-type/person-type.service';
import { DocumentRegion } from 'src/app/shared/DocumentRegion';
import { PersonType } from 'src/app/shared/PersonType';

@Component({
  selector: 'app-companys-details',
  templateUrl: './companys-details.component.html',
  styleUrls: ['./companys-details.component.sass']
})
export class CompanysDetailsComponent implements OnInit {

  company = new Company();
  id: number;
  name: string;
  companyTypeName: string;
  addressDescription: string;
  documentRegionName: string;
  personTypeName: string;
  isLoadingResults = true;
  constructor(private api: CompanyService, 
              private companyTypeApi: CompanyTypeService, 
              private addressApi: AddressService, 
              private documentRegionApi: DocumentRegionService,
              private personTypeApi: PersonTypeService,
              private router: Router,
              private route: ActivatedRoute) { }

  delete(id: number) {
      if(confirm('Deseja excluir o registro?'))
      {
      this.api.remove(id)
        .subscribe(res => {
          console.log(res);
          this.router.navigate(['/companys']);
        }, (err) => {
          console.log(err);
        }
      );  
    }
  }

  getAddress(id: number): any {
    this.addressApi.getById(id).subscribe((address: Address) => {
      this.addressDescription = address.description;
    }, err => {
      console.log(err);
    });
  }

  getCompanyTypes(id: number): any {
    this.companyTypeApi.getById(id).subscribe((companyType: CompanyType) => {
      this.companyTypeName = companyType.name;
    }, err => {
      console.log(err);
    });
  }

  getDocumentRegions(acronym: string): any {
    this.documentRegionApi.getByAcronym(acronym).subscribe((documentRegion: DocumentRegion) => {
      this.documentRegionName = documentRegion.name;
    }, err => {
      console.log(err);
    });
  }

  getPersonTypes(name: string): any {
    this.personTypeApi.getByName(name).subscribe((personType: PersonType) => {
      this.personTypeName = personType.name;
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.api.getById(id).subscribe((company: Company) => {
      console.log(company);
      this.company = company;
      this.getAddress(company.addressId);
      this.getCompanyTypes(company.companyTypeId);
      this.getDocumentRegions(company.documentRegion);
      this.getPersonTypes(company.personType);
      this.isLoadingResults = false;
    });
  }
}
