import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../../../services/manager/manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Manager } from 'src/app/shared/Manager';

@Component({
  selector: 'app-managers-details',
  templateUrl: './managers-details.component.html',
  styleUrls: ['./managers-details.component.sass']
})
export class ManagersDetailsComponent implements OnInit {

  manager = new Manager();
  id: number;
  name: string;
  isLoadingResults = true;
  constructor(private api: ManagerService, 
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.api.getById(id).subscribe((manager: Manager) => {
      console.log(manager);
      this.manager = manager;
      this.isLoadingResults = false;
    });
  }
}
