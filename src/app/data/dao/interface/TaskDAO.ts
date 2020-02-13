import {CommonDAO} from './CommonDAO';
import {TaskModel} from '../../../models/TaskModel';
import {CategoryModel} from '../../../models/CategoryModel';
import {PriorityModel} from '../../../models/PriorityModel';
import {Observable} from 'rxjs';

export interface TaskDAO extends CommonDAO<TaskModel> {

    // поиск задач по всем параметрам
    // если какой-либо параметр равен null - он не будет учитываться при поиске
    search(category: CategoryModel, searchText: string, status: boolean, priority: PriorityModel): Observable<TaskModel[]>;

    // кол-во завершенных задач в заданной категории (если category === null, то для всех категорий)
    getCompletedCountInCategory(category: CategoryModel): Observable<number>;

    // кол-во незавершенных задач в заданной категории (если category === null, то для всех категорий)
    getUncompletedCountInCategory(category: CategoryModel): Observable<number>;

    // кол-во всех задач в заданной категории (если category === null, то для всех категорий)
    getTotalCountInCategory(category: CategoryModel): Observable<number>;

    // кол-во всех задач в общем
    getTotalCount(): Observable<number>;
}
