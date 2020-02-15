import {TaskDAO} from '../interface/TaskDAO';
import {TaskModel} from '../../../models/TaskModel';
import {CategoryModel} from '../../../models/CategoryModel';
import {PriorityModel} from '../../../models/PriorityModel';
import {Observable, of} from 'rxjs';
import {TestData} from '../../TestData';


export class TaskDAOArray implements TaskDAO {

    add(T): Observable<TaskModel> {
        return undefined;
    }

    delete(id: number): Observable<TaskModel> {
        return undefined;
    }

    get(id: number): Observable<TaskModel> {
        return of(TestData.tasks.find(todo => todo.id === id));
    }

    getAll(): Observable<TaskModel[]> {
        return of(TestData.tasks);
    }

    getCompletedCountInCategory(category: CategoryModel): Observable<number> {
        return undefined;
    }

    getTotalCount(): Observable<number> {
        return undefined;
    }

    getTotalCountInCategory(category: CategoryModel): Observable<number> {
        return undefined;
    }

    getUncompletedCountInCategory(category: CategoryModel): Observable<number> {
        return undefined;
    }

    search(category: CategoryModel, searchText: string, status: boolean, priority: PriorityModel): Observable<TaskModel[]> {
        return undefined;
    }

    update(T): Observable<TaskModel> {
        return undefined;
    }

}
