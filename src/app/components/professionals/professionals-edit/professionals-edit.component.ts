import { Component, OnInit, Input } from '@angular/core';
import { ProfessionalService } from '../../../services/professional/professional.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Professional } from '../../../shared/Professional';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company/company.service';
import { Company } from 'src/app/shared/Company';
import { ErrorStateMatcher } from '@angular/material/core';
import { TeamService } from 'src/app/services/team/team.service';
import { Team } from 'src/app/shared/Team';

@Component({
  selector: 'app-professionals-edit',
  templateUrl: './professionals-edit.component.html',
  styleUrls: ['./professionals-edit.component.sass']
})
export class ProfessionalsEditComponent implements OnInit {
  @Input() professional = new Professional();
  professionalsForm: FormGroup;
  id:number;
  isLoadingResults = false;
  teams: Team[] = [];
  matcher = new ErrorStateMatcher();
  
  constructor(private api: ProfessionalService,
    private teamApi: TeamService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    const { name, email, mobile, phone, motherName, dateBirth, teamId, userId } = this.professionalsForm.value;
    this.professional = new Professional();
    this.id = this.route.snapshot.params['id'];
    this.professional.name = name;
    this.professional.email = email;
    this.professional.mobile = mobile;
    this.professional.phone = phone;
    this.professional.motherName = motherName;
    this.professional.dateBirth = dateBirth;
    this.professional.teamId = teamId;
    this.professional.userId = userId;
  

    this.api.update(this.id, this.professional)
        .subscribe(res => {
          let id = this.id;
          this.isLoadingResults = false;
          this.router.navigate(['/professionals-details', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  update() {
    this.api.update(this.route.snapshot.params['id'], this.professional).subscribe((professional) => {
      this.router.navigate(['/professionals-details/' + professional.id]);
    }, (err) => {
      console.log(err);
    });
  }

  remove(id: number) {
    this.api.remove(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/professionals']);
      }, (err) => {
        console.log(err);
      }
    );  
  }

  professionalDetails() {
    this.router.navigate(['/professionals-details', this.professional.id]);
  }

  getCompanys(): any {
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
    this.api.getById(this.route.snapshot.params['id'])
    .subscribe((professional: Professional) => {
      console.log(professional);
      this.professional.id = professional.id;
      this.professional.name = professional.name;
      this.professional.email = professional.email;
      this.professional.phone = professional.phone;
      this.professional.mobile = professional.mobile;
      this.professional.motherName = professional.motherName;
      this.professional.dateBirth = professional.dateBirth;
      this.professional.teamId = professional.teamId;
      this.professional.userId = professional.userId;

      this.professionalsForm.setValue({
        name: professional.name,
        email: professional.email,
        phone: professional.phone,
        mobile: professional.mobile,
        motherName: professional.motherName,
        dateBirth: professional.dateBirth,
        teamId: professional.teamId,
        userId: professional.userId
      });
    });

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

    this.getCompanys();
  }
}
