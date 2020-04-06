import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessionalService } from '../../../services/professional/professional.service';
import { Professional } from '../../../shared/Professional';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Company } from 'src/app/shared/Company';
import { CompanyService } from 'src/app/services/company/company.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { TeamService } from 'src/app/services/team/team.service';
import { Team } from 'src/app/shared/Team';

@Component({
  selector: 'app-professionals-add',
  templateUrl: './professionals-add.component.html',
  styleUrls: ['./professionals-add.component.sass']
})
export class ProfessionalsAddComponent implements OnInit {

  @Input() professional = new Professional();
  professionalsForm: FormGroup;
  isLoadingResults = false;
  teams: Team[] = [];
  matcher = new ErrorStateMatcher();
  
  constructor(private api:ProfessionalService, 
              private teamApi: TeamService,
              private router: Router,
              private formBuilder: FormBuilder) { }
  
onFormSubmit(form:NgForm) {
  this.isLoadingResults = true;
  
  const { name, email, mobile, phone, motherName, dateBirth, teamId, userId } = this.professionalsForm.value;
  this.professional = new Professional();
  this.professional.name = name;
  this.professional.email = email;
  this.professional.mobile = mobile;
  this.professional.phone = phone;
  this.professional.motherName = motherName;
  this.professional.dateBirth = dateBirth;
  this.professional.teamId = teamId;
  this.professional.userId = userId;

  console.log(this.professional);
  this.api.add(this.professional)
    .subscribe(res => {
        console.log(res);
        let id = res['id'];
        this.isLoadingResults = false;
        this.router.navigate(['/professionals-details', id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  } 

  add() {
    this.api.add(this.professional).subscribe((res) => {
      this.router.navigate['/professionals'];
    }, (err) => {
        console.log(err);
    });
  }

  getTeams(): any {
    this.teamApi.get().subscribe(teams => {
      this.teams = teams;
      console.log(this.teams);
      function sayHi() {
        alert('Hello');
      }
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
    });
  }
  
  ngOnInit() {
    this.getTeams();

    this.professionalsForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'email' : [null, Validators.required],
      'phone' : [null, Validators.required],
      'mobile' : [null, Validators.required],
      'motherName' : [null, Validators.required],
      'dateBirth' : [null, Validators.required],
      'teamId' : [null, Validators.required],
      'userId' : [null, Validators.required]
    });

    
  }
}
