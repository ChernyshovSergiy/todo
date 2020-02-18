import {PriorityDAO} from '../interface/PriorityDAO';
import {PriorityModel} from 'src/app/models/PriorityModel';
import {Observable, of} from 'rxjs';
import {TaskModel} from '../../../models/TaskModel';
import {TestData} from '../../TestData';

export class PriorityDAOArray implements PriorityDAO {

    add(T): Observable<PriorityModel> {
        return undefined;
    }

    delete(id: number): Observable<PriorityModel> {
        return undefined;
    }

    get(id: number): Observable<PriorityModel> {
        return undefined;
    }

    getAll(): Observable<PriorityModel[]> {
        return of(TestData.priorities);
    }

    update(T): Observable<PriorityModel> {
        return undefined;
    }

}
