import { Component, OnInit, Input } from '@angular/core';
import { TeamService } from '../../../services/team/team.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Team } from '../../../shared/Team';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ManagerService } from 'src/app/services/manager/manager.service';
import { CompanyService } from 'src/app/services/company/company.service';
import { Company } from 'src/app/shared/Company';
import { Manager } from 'src/app/shared/Manager';
import { DepartmentService } from 'src/app/services/department/department.service';
import { Department } from 'src/app/shared/Department';

@Component({
  selector: 'app-teams-edit',
  templateUrl: './teams-edit.component.html',
  styleUrls: ['./teams-edit.component.sass']
})
export class TeamsEditComponent implements OnInit {
  @Input() team = new Team();
  teamsForm: FormGroup;
  id:number;
  departments: Department[] = [];
  managers: Manager[] = [];
  isLoadingResults = false;
  matcher = new ErrorStateMatcher();

  constructor(private api: TeamService,
              private departmentApi: DepartmentService,
              private managerApi: ManagerService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    const { description, leaderId, departmentId } = this.teamsForm.value;
    this.team = new Team();
    this.id = this.route.snapshot.params['id'];
    this.team.description = description;
    this.team.leaderId = leaderId;
    this.team.departmentId = departmentId;
  
    this.api.update(this.id, this.team)
        .subscribe(res => {
          let id = this.id;
          this.isLoadingResults = false;
          this.router.navigate(['/teams-details', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  update() {
    this.api.update(this.route.snapshot.params['id'], this.team).subscribe((teams) => {
      this.router.navigate(['/teams-details/' + teams.id]);
    }, (err) => {
      console.log(err);
    });
  }

  remove(id: number) {
    this.api.remove(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/teams']);
      }, (err) => {
        console.log(err);
      }
    );  
  }

  teamDetails() {
    this.router.navigate(['/teams-details', this.team.id]);
  }

  getDepartments(): any {
    this.departmentApi.get().subscribe(departments => {
      this.departments = departments;
      console.log(this.departments);
      function sayHi() {
        alert('Hello');
      }
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
    });
  }

  getManagers(): any {
    this.managerApi.get().subscribe(managers => {
      this.managers = managers;
      console.log(this.managers);
      function sayHi() {
        alert('Hello');
      }
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
    this.getDepartments();
    this.getManagers();

    this.api.getById(this.route.snapshot.params['id'])
    .subscribe((team: Team) => {
      console.log(team);
      this.team.id = team.id;
      this.team.description = team.description;
      this.team.leaderId = team.leaderId;
      this.team.departmentId = team.departmentId;

      this.teamsForm.setValue({
        description: team.description,
        leaderId: team.leaderId,
        departmentId: team.departmentId
      });
    });

    this.teamsForm = this.formBuilder.group({
      'description' : [null, Validators.required],
      'leaderId' : [null, Validators.required],
      'departmentId' : [null, Validators.required]
    });
  }
}