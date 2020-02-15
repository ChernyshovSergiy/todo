import {Component, OnInit} from '@angular/core';
import {TaskModel} from './models/TaskModel';
import {DataHandlerService} from './services/data-handler.service';
import {CategoryModel} from './models/CategoryModel';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'todo';
    tasks: TaskModel[];
    categories: CategoryModel[];

    constructor(private dataHandler: DataHandlerService) { // фасад для работы с данными
    }

    ngOnInit(): void {
        this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
        this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    }
}
