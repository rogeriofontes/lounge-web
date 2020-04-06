import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.sass']
})
export class BarraComponent implements OnInit {
  title = 'dashboard';
  chart = [];

  ngOnInit() {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['Concordo Plenamente ', 'Concordo Parcialmente', 'Não Concordo Nem Discordo',
        'Discordo Parcialmente', 'Discordo Totalmente', 'Não Sei Responder', 'Não Se Aplica'],
        datasets: [
          {
            label: 'Questão 1',
            data: [1, 3, 5, 10, 56, 65, 35].reverse(),
            backgroundColor: 'red',
            borderColor: 'red',
            fill: true,
          },
          {
            label: 'Questão 2',
            data: [1, 3, 5, 10, 56, 65, 35].reverse(),
            backgroundColor: 'green',
            borderColor: 'green',
            fill: true,
          },
          {
            label: 'Questão 3',
            data: [1, 3, 5, 10, 56, 65, 35].reverse(),
            backgroundColor: 'yellow',
            borderColor: 'yellow',
            fill: true,
          },
          {
            label: 'Questão 4',
            data: [1, 3, 5, 10, 56, 65, 35].reverse(),
            backgroundColor: 'orange',
            borderColor: 'orange',
            fill: true,
          },
          {
            label: 'Questão 5',
            data: [1, 3, 5, 10, 56, 65, 35].reverse(),
            backgroundColor: 'brown',
            borderColor: 'brown',
            fill: true,
          },
          {
            label: 'Questão 6',
            data: [1, 3, 5, 10, 56, 65, 35].reverse(),
            backgroundColor: 'purple',
            borderColor: 'purple',
            fill: true,
          },
          {
            label: 'Questão 7',
            data: [1, 3, 5, 10, 56, 65, 35].reverse(),
            backgroundColor: 'gray',
            borderColor: 'gray',
            fill: true,
          },
          {
            label: 'Questão 8',
            data: [1, 3, 5, 10, 56, 65, 35].reverse(),
            backgroundColor: 'lime',
            borderColor: 'lime',
            fill: true,
          },
          {
            label: 'Questão 9',
            data: [1, 3, 5, 10, 56, 65, 35].reverse(),
            backgroundColor: 'crimson',
            borderColor: 'crimson',
            fill: true,
          },
          {
            label: 'Questão 10',
            data: [1, 3, 5, 10, 56, 65, 35].reverse(),
            backgroundColor: 'blue',
            borderColor: 'blue',
            fill: true,
          },
        ]
      }
    })
  }

}
