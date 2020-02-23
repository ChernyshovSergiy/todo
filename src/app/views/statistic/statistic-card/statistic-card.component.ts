import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-statistic-card',
  templateUrl: './statistic-card.component.html',
  styleUrls: ['./statistic-card.component.css']
})
// карточка для отображения статистики
export class StatisticCardComponent implements OnInit {

    @Input()
    completed = false;

    @Input()
    cardHeaderColor: string;

    @Input()
    iconName: string;

    @Input()
    count1: any;

    @Input()
    countTotal: any;

    @Input()
    cardIconColor: string;

    @Input()
    smallIconName: string;

    @Input()
    title: string;

  constructor() { }

  ngOnInit() {
  }

}
