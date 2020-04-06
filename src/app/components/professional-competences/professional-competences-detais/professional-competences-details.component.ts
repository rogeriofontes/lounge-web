import { Component, OnInit } from '@angular/core';
import { ProfessionalCompetenceService } from '../../../services/professional-competence/professional-competence.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessionalCompetence } from 'src/app/shared/ProfessionalCompetence';

@Component({
  selector: 'app-professional-competences-details',
  templateUrl: './professional-competences-details.component.html',
  styleUrls: ['./professional-competences-details.component.sass']
})
export class ProfessionalCompetencesDetailsComponent implements OnInit {

  professionalCompetence = new ProfessionalCompetence();
  id: number;
  name: string;
  isLoadingResults = true;
  constructor(private api: ProfessionalCompetenceService, 
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.api.getById(id).subscribe((professionalCompetence: ProfessionalCompetence) => {
      console.log(professionalCompetence);
      this.professionalCompetence = professionalCompetence;
      this.isLoadingResults = false;
    });
  }
}
