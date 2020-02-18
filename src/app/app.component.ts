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

    private selectedCategory: CategoryModel = null;

    constructor(private dataHandler: DataHandlerService) { // фасад для работы с данными
    }

    ngOnInit(): void {
        // this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
        this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);

        this.onSelectCategory(null); // показать все задачи

    }

    // изменение категории
    private onSelectCategory(category: CategoryModel) {

        this.selectedCategory = category;

        this.dataHandler.searchTasks(
            this.selectedCategory,
            null,
            null,
            null
        ).subscribe(tasks => {
            this.tasks = tasks;
        });

    }

    // обновление задачи
    private onUpdateTask(task: TaskModel) {

        this.dataHandler.updateTask(task).subscribe(() => {
            this.dataHandler.searchTasks(
                this.selectedCategory,
                null,
                null,
                null
            ).subscribe(tasks => {
                this.tasks = tasks;
            });
        });

    }

    // удаление задачи
    private onDeleteTask(task: TaskModel) {

        this.dataHandler.deleteTask(task.id).subscribe(() => {
            this.dataHandler.searchTasks(
                this.selectedCategory,
                null,
                null,
                null
            ).subscribe(tasks => {
                this.tasks = tasks;
            });
        });


    }
}
