import {CommonDAO} from './CommonDAO';
import {CategoryModel} from '../../../models/CategoryModel';
import {Observable} from 'rxjs';

// специфичные методы для работы с категориями (которые не входят в обычный CRUD)
export interface CategoryDAO extends CommonDAO<CategoryModel> {
    // поиск категорий по названию
    search(title: string): Observable<CategoryModel[]>;

}
