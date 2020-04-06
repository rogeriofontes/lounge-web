import { CanActivate } from '@angular/router';
import { Dash } from './../../shared/Dash';
import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  public currentUser;

  dash: Dash[] = [
    {id: 1, nome: 'Sentence 1', descricao: 'kkk', cols: 1, rows: 1, color: 'lightblue'},
    {id: 2, nome: 'Sentence 2', descricao: 'kkk', cols: 1, rows: 1, color: 'lightgreen'},
    {id: 3, nome: 'Sentence 3', descricao: 'kkk', cols: 1, rows: 1, color: 'lightpink'},
  ];

  constructor() {
    this.currentUser = JSON.parse(window.localStorage.getItem('userId'));
    console.log('currentUser', this.currentUser);
   }

  async ngOnInit() {

  }

}
