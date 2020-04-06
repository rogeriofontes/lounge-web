import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessionalCompetenceService } from '../../../services/professional-competence/professional-competence.service';
import { ProfessionalCompetence } from '../../../shared/ProfessionalCompetence';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-professional-competences-add',
  templateUrl: './professional-competences-add.component.html',
  styleUrls: ['./professional-competences-add.component.sass']
})
export class ProfessionalCompetencesAddComponent implements OnInit {

  //Melhoria trazendo o Objeto
  @Input() professionalCompetence = new ProfessionalCompetence(); //{id: '', nome: '', descricao: ''};
  name: string;
  professionalCompetencesForm: FormGroup;
  isLoadingResults = false;
  matcher = new ErrorStateMatcher();
  
  constructor(private api: ProfessionalCompetenceService, 
              private router: Router,
              private formBuilder: FormBuilder) { }
  
onFormSubmit(form:NgForm) {
  this.isLoadingResults = true;
  
  const { description } = this.professionalCompetencesForm.value;
  this.professionalCompetence = new ProfessionalCompetence();
  this.professionalCompetence.description = description;

  this.api.add(this.professionalCompetence)
    .subscribe(res => {
        console.log(res);
        let id = res['id'];
        this.isLoadingResults = false;
        this.router.navigate(['/professional-competences-details', id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  } 

  add() {
    this.api.add(this.professionalCompetence).subscribe((res) => {
      this.router.navigate['/professional-competences'];
    }, (err) => {
        console.log(err);
    });
  }
  
  ngOnInit() {
    this.professionalCompetencesForm = this.formBuilder.group({
      'description' : [null, Validators.required]
    });
  }
}
