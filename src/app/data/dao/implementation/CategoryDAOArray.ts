import {CategoryDAO} from '../interface/CategoryDAO';
import {CategoryModel} from 'src/app/models/CategoryModel';
import {Observable} from 'rxjs';

export class CategoryDAOArray implements CategoryDAO {

    add(T): Observable<CategoryModel> {
        return undefined;
    }

    delete(id: number): Observable<CategoryModel> {
        return undefined;
    }

    get(id: number): Observable<CategoryModel> {
        return undefined;
    }

    getAll(): Observable<CategoryModel[]> {
        return undefined;
    }

    search(title: string): Observable<CategoryModel[]> {
        return undefined;
    }

    update(T): Observable<CategoryModel> {
        return undefined;
    }

}
