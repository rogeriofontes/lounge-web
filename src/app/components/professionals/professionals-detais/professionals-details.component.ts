import { Component, OnInit } from '@angular/core';
import { ProfessionalService } from '../../../services/professional/professional.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Professional } from 'src/app/shared/Professional';
import { Team } from 'src/app/shared/Team';
import { TeamService } from 'src/app/services/team/team.service';

@Component({
  selector: 'app-professionals-details',
  templateUrl: './professionals-details.component.html',
  styleUrls: ['./professionals-details.component.sass']
})
export class ProfessionalsDetailsComponent implements OnInit {
  professional = new Professional();
  id: number;
  teamName: string;
  isLoadingResults = true;
  constructor(private api: ProfessionalService, 
              private teamApi: TeamService,
              private router: Router,
              private route: ActivatedRoute) { }

  delete(id: number) {
    if(confirm('Deseja excluir o registro?'))
    {
    this.api.remove(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/professionals']);
      }, (err) => {
        console.log(err);
      }
    );
    }
  }

  getTeams(id: number): any {
    this.teamApi.getById(id).subscribe((team: Team) => {
      this.teamName = team.description;
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.api.getById(id).subscribe((professional: Professional) => {
      console.log(professional);
      this.professional = professional;
      this.getTeams(professional.teamId);
      this.isLoadingResults = false;
    });
  }
}
