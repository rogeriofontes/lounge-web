import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../../services/team/team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from 'src/app/shared/Team';

@Component({
  selector: 'app-teams-details',
  templateUrl: './teams-details.component.html',
  styleUrls: ['./teams-details.component.sass']
})
export class TeamsDetailsComponent implements OnInit {

  team = new Team();
  id: number;
  name: string;
  isLoadingResults = true;
  constructor(private api: TeamService, 
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.api.getById(id).subscribe((team: Team) => {
      console.log(team);
      this.team = team;
      this.isLoadingResults = false;
    });
  }
}
