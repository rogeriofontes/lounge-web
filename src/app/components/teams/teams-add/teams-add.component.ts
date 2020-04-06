import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../../../services/team/team.service';
import { Team } from '../../../shared/Team';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ManagerService } from 'src/app/services/manager/manager.service';
import { Manager } from 'src/app/shared/Manager';
import { Department } from 'src/app/shared/Department';
import { DepartmentService } from 'src/app/services/department/department.service';

@Component({
  selector: 'app-teams-add',
  templateUrl: './teams-add.component.html',
  styleUrls: ['./teams-add.component.sass']
})
export class TeamsAddComponent implements OnInit {

  @Input() team = new Team();
  teamsForm: FormGroup;
  isLoadingResults = false;
  departments: Department[] = [];
  managers: Manager[] = [];
  matcher = new ErrorStateMatcher();
  
  constructor(private api: TeamService, 
              private departmentApi: DepartmentService,
              private managerApi: ManagerService,
              private router: Router,
              private formBuilder: FormBuilder) { }
  
onFormSubmit(form:NgForm) {
  this.isLoadingResults = true;
  
  const { description, leaderId, departmentId } = this.teamsForm.value;
  this.team = new Team();
  this.team.description = description;
  this.team.leaderId = leaderId;
  this.team.departmentId = departmentId;

  this.api.add(this.team)
    .subscribe(res => {
        console.log(res);
        let id = res['id'];
        this.isLoadingResults = false;
        this.router.navigate(['/teams-details', id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  } 

  add() {
    this.api.add(this.team).subscribe((res) => {
      this.router.navigate['/teams'];
    }, (err) => {
        console.log(err);
    });
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

    this.teamsForm = this.formBuilder.group({
      'description' : [null, Validators.required],
      'leaderId' : [null, Validators.required],
      'departmentId' : [null, Validators.required]
    });
  }
}