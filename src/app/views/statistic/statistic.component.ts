import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-statistic',
    templateUrl: './statistic.component.html',
    styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

    // входящие параметры

    @Input()
    totalTasksInCategory: number; // общее кол-во задач в категории

    @Input()
    completedTaskInCategory: number; // общее кол-во завершенных задач в категории

    @Input()
    uncompletedTaskInCategory: number; // общее кол-во незавершенных задач в категории

    @Input()
    showStatistic: boolean; // показывать скрывать блок статистики

    constructor() {
    }

    ngOnInit() {
    }

}
