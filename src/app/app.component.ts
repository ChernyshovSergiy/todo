import {Component, OnInit} from '@angular/core';
import {TaskModel} from './models/TaskModel';
import {DataHandlerService} from './services/data-handler.service';
import {CategoryModel} from './models/CategoryModel';
import {PriorityModel} from './models/PriorityModel';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'todo';
    tasks: TaskModel[];
    categories: CategoryModel[];
    priorities: PriorityModel[];

    private selectedCategory: CategoryModel = null;

    // поиск
    private searchTaskText = ''; // текущее значение для поиска задач

    // фильтрация
    private statusFilter: boolean;
    private priorityFilter: PriorityModel;

    constructor(private dataHandler: DataHandlerService) { // фасад для работы с данными
    }

    ngOnInit(): void {
        // this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
        this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
        this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);

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

    // удаление категории
    private onDeleteCategory(category: CategoryModel) {
        this.dataHandler.deleteCategory(category.id).subscribe(cat => {
            this.selectedCategory = null; // открываем категорию "Все"
            this.onSelectCategory(this.selectedCategory);
        });
    }

    // обновлении категории
    private onUpdateCategory(category: CategoryModel) {
        this.dataHandler.updateCategory(category).subscribe(() => {
            this.onSelectCategory(this.selectedCategory);
        });
    }

    // поиск задач
    private onSearchTasks(searchString: string) {
        this.searchTaskText = searchString;
        this.updateTasks();
    }

    // фильтрация задач по статусу (все, решенные, нерешенные)
    private onFilterTasksByStatus(status: boolean) {
        this.statusFilter = status;
        this.updateTasks();
    }


    private updateTasks() {
        this.dataHandler.searchTasks(
            this.selectedCategory,
            this.searchTaskText,
            this.statusFilter,
            this.priorityFilter
        ).subscribe((tasks: TaskModel[]) => {
            this.tasks = tasks;
        });
    }

    private onFilterTasksByPriority(priority: PriorityModel) {
        this.priorityFilter = priority;
        this.updateTasks();
    }
}
