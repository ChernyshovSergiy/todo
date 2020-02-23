import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    @Input()
    categoryName: string;

    @Input()
    showStatistic: boolean;

    @Output()
    toggleShowStatistic = new EventEmitter<boolean>();

    constructor() {
    }

    ngOnInit() {
    }

    private changeShowStatus() {
        this.toggleShowStatistic.emit(!this.showStatistic);
    }
}
