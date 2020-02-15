import {Injectable} from '@angular/core';
import {CategoryModel} from '../models/CategoryModel';
import {TestData} from '../data/TestData';
import {TaskModel} from '../models/TaskModel';
import {Subject, AsyncSubject, ReplaySubject, BehaviorSubject, Observable} from 'rxjs';
import {TaskDAOArray} from '../data/dao/implementation/TaskDAOArray';
import {CategoryDAOArray} from '../data/dao/implementation/CategoryDAOArray';

@Injectable({
    providedIn: 'root'
})
export class DataHandlerService {

    tasksSubject = new BehaviorSubject<TaskModel[]>(TestData.tasks);
    private tasksDaoArray = new TaskDAOArray();
    private categoryDaoArray = new CategoryDAOArray();

    constructor() {
    }

    getAllTasks(): Observable<TaskModel[]> {
        return this.tasksDaoArray.getAll();
    }

    getAllCategories(): Observable<CategoryModel[]> {
        return this.categoryDaoArray.getAll();
    }

    // fillCategories(): CategoryModel[] {
    //     return TestData.categories;
    // }

    fillTasks() {
        this.tasksSubject.next(TestData.tasks);
    }

    fillTasksByCategory(category) {
        const tasks = TestData.tasks.filter(task => task.category === category);
        this.tasksSubject.next(tasks);
    }
}
