import {CommonDAO} from './CommonDAO';
import {Observable} from 'rxjs';
import {PriorityModel} from '../../../models/PriorityModel';

export interface PriorityDAO extends CommonDAO<PriorityModel> {
    // search(tile: string): Observable<PriorityModel[]>;
}
