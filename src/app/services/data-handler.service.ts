import {Injectable} from '@angular/core';
import {CategoryModel} from '../models/CategoryModel';
import {TaskModel} from '../models/TaskModel';
import {Observable} from 'rxjs';
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

    updateTask(task: TaskModel): Observable<TaskModel> {
        return this.tasksDaoArray.update(task);
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
