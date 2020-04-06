import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../services/department/department.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/shared/Department';

@Component({
  selector: 'app-departments-details',
  templateUrl: './departments-details.component.html',
  styleUrls: ['./departments-details.component.sass']
})
export class DepartmentsDetailsComponent implements OnInit {

  department = new Department();
  id: number;
  name: string;
  isLoadingResults = true;
  constructor(private api: DepartmentService, 
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.api.getById(id).subscribe((department: Department) => {
      console.log(department);
      this.department = department;
      this.isLoadingResults = false;
    });
  }
}
