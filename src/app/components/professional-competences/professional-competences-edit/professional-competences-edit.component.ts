import { Component, OnInit, Input } from '@angular/core';
import { ProfessionalCompetenceService } from '../../../services/professional-competence/professional-competence.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfessionalCompetence } from '../../../shared/ProfessionalCompetence';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-professional-competences-edit',
  templateUrl: './professional-competences-edit.component.html',
  styleUrls: ['./professional-compenteces-edit.component.sass']
})
export class ProfessionalCompetencesEditComponent implements OnInit {
  @Input() professionalCompetence = new ProfessionalCompetence();
  professionalCompetencesForm: FormGroup;
  id:number;
  name:string='';
  isLoadingResults = false;
  matcher = new ErrorStateMatcher();

  constructor(private api: ProfessionalCompetenceService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    const { description } = this.professionalCompetencesForm.value;
    this.professionalCompetence = new ProfessionalCompetence();
    this.id = this.route.snapshot.params['id'];
    this.professionalCompetence.description = description;

    this.api.update(this.id, this.professionalCompetence)
        .subscribe(res => {
          let id = this.id;
          this.isLoadingResults = false;
          this.router.navigate(['/professional-competences-details', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  update() {
    this.api.update(this.route.snapshot.params['id'], this.professionalCompetence).subscribe((professionalCompetences) => {
      this.router.navigate(['/professional-competences-details/' + professionalCompetences.id]);
    }, (err) => {
      console.log(err);
    });
  }

  remove(id: number) {
    this.api.remove(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/professional-competences']);
      }, (err) => {
        console.log(err);
      }
    );  
  }

  professionalCompetenceDetails() {
    this.router.navigate(['/professional-competences-details', this.professionalCompetence.id]);
  }

  ngOnInit() {
    this.api.getById(this.route.snapshot.params['id'])
    .subscribe((professionalCompetence: ProfessionalCompetence) => {
      console.log(professionalCompetence);
      this.professionalCompetence.id = professionalCompetence.id;
      this.professionalCompetencesForm.setValue({
        description: professionalCompetence.description
      });
    });

    this.professionalCompetencesForm = this.formBuilder.group({
      'description' : [null, Validators.required]
    });
  }


}
