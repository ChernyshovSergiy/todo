import {Injectable} from '@angular/core';
import {CategoryModel} from '../models/CategoryModel';
import {TestData} from '../data/TestData';
import {TaskModel} from '../models/TaskModel';
import {Subject, AsyncSubject, ReplaySubject, BehaviorSubject, Observable} from 'rxjs';
import {TaskDAOArray} from '../data/dao/implementation/TaskDAOArray';
import {CategoryDAOArray} from '../data/dao/implementation/CategoryDAOArray';
import {PriorityModel} from '../models/PriorityModel';

@Injectable({
    providedIn: 'root'
})
export class DataHandlerService {

    // релизации работы с данными с помощью массива
    // (можно подставлять любые релизации, в том числе с БД. Главное - соблюдать интерфейсы)
    private tasksDaoArray = new TaskDAOArray();
    private categoryDaoArray = new CategoryDAOArray();

    constructor() {
    }

    // getAllTasks(): Observable<TaskModel[]> {
    //     return this.tasksDaoArray.getAll();
    // }

    getAllCategories(): Observable<CategoryModel[]> {
        return this.categoryDaoArray.getAll();
    }

    // поиск задач по параметрам
    searchTasks(
        category: CategoryModel,
        searchText: string,
        status: boolean,
        priority: PriorityModel
    ): Observable<TaskModel[]> {
        return this.tasksDaoArray.search(category, searchText, status, priority);
    }

}
