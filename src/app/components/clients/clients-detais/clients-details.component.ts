import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/shared/Client';
import { Team } from 'src/app/shared/Team';
import { TeamService } from 'src/app/services/team/team.service';
import { CompanyService } from 'src/app/services/company/company.service';
import { Company } from 'src/app/shared/Company';

@Component({
  selector: 'app-clients-details',
  templateUrl: './clients-details.component.html',
  styleUrls: ['./clients-details.component.sass']
})
export class ClientsDetailsComponent implements OnInit {
  client = new Client();
  id: number;
  companyName: string;
  isLoadingResults = true;
  constructor(private api: ClientService, 
              private companyApi: CompanyService,
              private router: Router,
              private route: ActivatedRoute) { }

  delete(id: number) {
    if(confirm('Deseja excluir o registro?'))
    {
    this.api.remove(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/clients']);
      }, (err) => {
        console.log(err);
      }
    );
    }
  }

  getCompanys(id: number): any {
    this.companyApi.getById(id).subscribe((company: Company) => {
      this.companyName = company.name;
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.api.getById(id).subscribe((client: Client) => {
      console.log(client);
      this.client = client;
      this.getCompanys(client.companyId);
      this.isLoadingResults = false;
    });
  }
}
