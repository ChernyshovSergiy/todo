import {Component, OnInit} from '@angular/core';
import {TaskModel} from './models/TaskModel';
import {DataHandlerService} from './services/data-handler.service';
import {CategoryModel} from './models/CategoryModel';
import {PriorityModel} from './models/PriorityModel';
import {zip} from 'rxjs';

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
    private searchCategoryText: string;

    // статистика
    private onTotalTasksInCategory: number;
    private onCompletedTaskInCategory: number;
    private onUncompletedTaskInCategory: number;
    private uncompletedTotalTaskCount: number;

    constructor(private dataHandler: DataHandlerService) { // фасад для работы с данными
    }

    ngOnInit(): void {
        // this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
        // this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
        this.updateCategories();
        this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);

        this.onSelectCategory(null); // показать все задачи

    }

    updateCategories() {
        this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    }

    // изменение категории
    private onSelectCategory(category: CategoryModel) {

        this.selectedCategory = category;

        this.updateTasksAndStatistic();

    }

    // обновление задачи
    private onUpdateTask(task: TaskModel) {

        this.dataHandler.updateTask(task).subscribe(() => {
            this.updateTasksAndStatistic();
        });

    }

    // удаление задачи
    private onDeleteTask(task: TaskModel) {

        this.dataHandler.deleteTask(task.id).subscribe(() => {
            this.updateTasksAndStatistic();
        });
    }

    // удаление категории
    private onDeleteCategory(category: CategoryModel) {
        this.dataHandler.deleteCategory(category.id).subscribe(() => {
            this.selectedCategory = null; // открываем категорию "Все"
            this.onSelectCategory(null);
        });
    }

    // обновлении категории
    private onUpdateCategory(category: CategoryModel) {
        this.dataHandler.updateCategory(category).subscribe(() => {
            this.onSearchCategory(this.searchCategoryText);
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

    // добавление задачи
    private onAddTask(task: TaskModel) {
        this.dataHandler.addTask(task).subscribe(() => {
            this.updateTasksAndStatistic();
        });
    }

    // добавление категории
    private onAddCategory(title: string) {
        this.dataHandler.addCategory(title).subscribe(() => {
            this.updateCategories();
        });
    }

    onSearchCategory(title: string) {
        this.searchCategoryText = title;

        this.dataHandler.searchCategories(title).subscribe(categories => {
            this.categories = categories;
        });
    }
        // обновление задач и переменных статистики с учётом фильтров
    private updateTasksAndStatistic() {
        this.updateTasks();
        this.updateStatistic();
    }

    // обновление статистики
    private updateStatistic() {
        zip(
            this.dataHandler.getTotalTasksInCategory(this.selectedCategory),
            this.dataHandler.getCompletedTaskInCategory(this.selectedCategory),
            this.dataHandler.getUncompletedTaskInCategory(this.selectedCategory),
            this.dataHandler.getUncompletedTotalTaskCount()
        ).subscribe( array => {
            this.onTotalTasksInCategory = array[0];
            this.onCompletedTaskInCategory = array[1];
            this.onUncompletedTaskInCategory = array[2];
            this.uncompletedTotalTaskCount = array[3]; // нужна для обработки категории Все
        });
    }
}

