import { Component, OnInit } from '@angular/core';
import { PositionService } from '../../../services/position/position.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Position } from 'src/app/shared/Position';
import { Department } from 'src/app/shared/Department';
import { DepartmentService } from 'src/app/services/department/department.service';
import { Professional } from 'src/app/shared/Professional';
import { ProfessionalService } from 'src/app/services/professional/professional.service';

@Component({
  selector: 'app-positions-details',
  templateUrl: './positions-details.component.html',
  styleUrls: ['./positions-details.component.sass']
})
export class PositionsDetailsComponent implements OnInit {

  position = new Position();
  id: number;
  name: string;
  departmentName: string;
  professionalName: string;
  isLoadingResults = true;
  constructor(private api: PositionService, 
              private departmentApi: DepartmentService, 
              private professionalApi: ProfessionalService, 
              private router: Router,
              private route: ActivatedRoute) { }

   getDepartments(id: number): any {
      this.departmentApi.getById(id).subscribe((department: Department) => {
        this.departmentName = department.description;
        }, err => {
          console.log(err);
        });
  }
            
   getProfessionals(id: number): any {
      this.professionalApi.getById(id).subscribe((professional: Professional) => {
        this.professionalName = professional.name;
        }, err => {
          console.log(err);
        });
  }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.api.getById(id).subscribe((position: Position) => {
      console.log(position);
      this.position = position;
      this.getDepartments(position.departmentId);
      this.getProfessionals(position.professionalId);
      this.isLoadingResults = false;
    });
  }
}
