import { ProfessionalCompetence } from '../../../shared/ProfessionalCompetence';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessionalCompetenceService } from '../../../services/professional-competence/professional-competence.service';
import { from } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-professional-competences',
  templateUrl: './professional-competences.component.html',
  styleUrls: ['./professional-competences.component.sass']
})
export class ProfessionalCompetencesComponent implements OnInit {

  titulo = 'Company List';
  displayedColumns: string[] = ['Id', 'Name', 'actions'];
  isLoadingResults = true;
  professionalCompetences: ProfessionalCompetence[] = [];
  dataSource: MatTableDataSource<ProfessionalCompetence>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private api: ProfessionalCompetenceService,
    private router: Router
    ) {
    this.dataSource = new MatTableDataSource(this.professionalCompetences);
    }

  add() {
    this.router.navigate(['/professional-competences-add']);
  }

  get() {
    this.api.get().subscribe(professionalCompetences => {
      this.dataSource.data = professionalCompetences;
      console.log(this.professionalCompetences);
      function sayHi() {
        alert('Hello');
      }
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
    });
  }

  delete(id: number) {
    if(confirm('Deseja excluir o registro?'))
    {
    this.api.remove(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/professional-competences']);
      }, (err) => {
        console.log(err);
      }
      );
    }
  }

  /**
 * Set the paginator and sort after the view init since this component will
 * be able to query its view for the initialized paginator and sort.
 */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    console.log('');
    this.get();
  }

}
