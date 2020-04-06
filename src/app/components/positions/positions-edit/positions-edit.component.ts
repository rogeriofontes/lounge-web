import { Component, OnInit, Input } from '@angular/core';
import { PositionService } from '../../../services/position/position.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Position } from '../../../shared/Position';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ManagerService } from 'src/app/services/manager/manager.service';
import { CompanyService } from 'src/app/services/company/company.service';
import { Company } from 'src/app/shared/Company';
import { Manager } from 'src/app/shared/Manager';
import { Professional } from 'src/app/shared/Professional';
import { ProfessionalService } from 'src/app/services/professional/professional.service';
import { Department } from 'src/app/shared/Department';
import { DepartmentService } from 'src/app/services/department/department.service';

@Component({
  selector: 'app-positions-edit',
  templateUrl: './positions-edit.component.html',
  styleUrls: ['./positions-edit.component.sass']
})
export class PositionsEditComponent implements OnInit {
  @Input() position = new Position();
  positionsForm: FormGroup;
  id:number;
  name:string='';
  departments: Department[] = [];
  professionals: Professional[] = [];
  isLoadingResults = false;
  matcher = new ErrorStateMatcher();

  constructor(private api: PositionService,
              private departmentApi: DepartmentService,
              private professionalApi: ProfessionalService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    const { description, departmentId, professionalId, totalPosition } = this.positionsForm.value;
    this.position = new Position();
    this.id = this.route.snapshot.params['id'];
    this.position.description = description;
    this.position.totalPosition = totalPosition;
    this.position.departmentId = departmentId;
    this.position.professionalId = professionalId;
  
    this.api.update(this.id, this.position)
        .subscribe(res => {
          let id = this.id;
          this.isLoadingResults = false;
          this.router.navigate(['/positions-details', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  update() {
    this.api.update(this.route.snapshot.params['id'], this.position).subscribe((positions) => {
      this.router.navigate(['/positions-details/' + positions.id]);
    }, (err) => {
      console.log(err);
    });
  }

  remove(id: number) {
    this.api.remove(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/positions']);
      }, (err) => {
        console.log(err);
      }
    );  
  }

  positionDetails() {
    this.router.navigate(['/positions-details', this.position.id]);
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

    this.api.getById(this.route.snapshot.params['id'])
    .subscribe((position: Position) => {
      console.log(position);
      this.position.id = position.id;
      this.position.description = position.description;
      this.position.totalPosition = position.totalPosition;
      this.position.departmentId = position.departmentId;
      this.position.professionalId = position.professionalId;

      this.positionsForm.setValue({
        description: position.description,
        totalPosition: position.totalPosition,
        departmentId: position.departmentId,
        professionalId: position.professionalId
      });
    });

    this.positionsForm = this.formBuilder.group({
      'description' : [null, Validators.required],
      'departmentId' : [null, Validators.required],
      'professionalId' : [null, Validators.required],
      'totalPosition' : [null, Validators.required]
    });
  }
}
