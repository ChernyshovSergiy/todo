import {Injectable} from '@angular/core';
import {CategoryModel} from '../models/CategoryModel';
import {TestData} from '../data/TestData';
import {TaskModel} from '../models/TaskModel';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataHandlerService {

    tasksSubject = new Subject<TaskModel[]>();

    constructor() {
    }

    fillCategories(): CategoryModel[] {
        return TestData.categories;
    }

    fillTasks() {
        this.tasksSubject.next(TestData.tasks);
    }

    fillTasksByCategory(category) {
        const tasks = TestData.tasks.filter(task => task.category === category);
        this.tasksSubject.next(tasks);
    }
}
