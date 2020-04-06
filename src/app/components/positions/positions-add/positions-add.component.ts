import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PositionService } from '../../../services/position/position.service';
import { Position } from '../../../shared/Position';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CompanyService } from 'src/app/services/company/company.service';
import { Company } from 'src/app/shared/Company';
import { ManagerService } from 'src/app/services/manager/manager.service';
import { Manager } from 'src/app/shared/Manager';
import { Professional } from 'src/app/shared/Professional';
import { ProfessionalService } from 'src/app/services/professional/professional.service';
import { Department } from 'src/app/shared/Department';
import { DepartmentService } from 'src/app/services/department/department.service';

@Component({
  selector: 'app-positions-add',
  templateUrl: './positions-add.component.html',
  styleUrls: ['./positions-add.component.sass']
})
export class PositionsAddComponent implements OnInit {

  @Input() position = new Position();
  positionsForm: FormGroup;
  isLoadingResults = false;
  departments: Department[] = [];
  professionals: Professional[] = [];
  matcher = new ErrorStateMatcher();
  
  constructor(private api: PositionService, 
              private departmentApi: DepartmentService,
              private professionalApi: ProfessionalService,
              private router: Router,
              private formBuilder: FormBuilder) { }
  
onFormSubmit(form:NgForm) {
  this.isLoadingResults = true;
  
  const { description, departmentId, professionalId, totalPosition } = this.positionsForm.value;
  this.position = new Position();
  this.position.description = description;
  this.position.totalPosition = totalPosition;
  this.position.departmentId = departmentId;
  this.position.professionalId = professionalId;

  this.api.add(this.position)
    .subscribe(res => {
        console.log(res);
        let id = res['id'];
        this.isLoadingResults = false;
        this.router.navigate(['/positions-details', id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  } 

  add() {
    this.api.add(this.position).subscribe((res) => {
      this.router.navigate['/positions'];
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

  getProfessionals(): any {
    this.professionalApi.get().subscribe(professionals => {
      this.professionals = professionals;
      console.log(this.professionals);
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
    this.getProfessionals();

    this.positionsForm = this.formBuilder.group({
      'description' : [null, Validators.required],
      'professionalId' : [null, Validators.required],
      'departmentId' : [null, Validators.required],
      'totalPosition' : [null, Validators.required]
    });
  }
}