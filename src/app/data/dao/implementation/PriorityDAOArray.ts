import {PriorityDAO} from '../interface/PriorityDAO';
import {PriorityModel} from 'src/app/models/PriorityModel';
import {Observable} from 'rxjs';

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
        return undefined;
    }

    update(T): Observable<PriorityModel> {
        return undefined;
    }

}
