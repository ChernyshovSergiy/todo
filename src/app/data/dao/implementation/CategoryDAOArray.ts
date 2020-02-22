import {CategoryDAO} from '../interface/CategoryDAO';
import {CategoryModel} from 'src/app/models/CategoryModel';
import {Observable, of} from 'rxjs';
import {TestData} from '../../TestData';

export class CategoryDAOArray implements CategoryDAO {

    // находит последний id (чтобы потом вставить новую запись с id, увеличенным на 1) - в реальной БД это происходит автоматически
    protected static getLastIdTCategory(): number {
        return Math.max.apply(Math, TestData.categories.map(category => category.id)) + 1;
    }

    add(category: CategoryModel): Observable<CategoryModel> {
        // если id пустой - генерируем его
        if (category.id === null || category.id === 0) {
            category.id = CategoryDAOArray.getLastIdTCategory();
        }
        TestData.categories.push(category);

        return of(category);
    }

    delete(id: number): Observable<CategoryModel> {

        // перед удалением - нужно в задачах занулить все ссылки на удаленное значение
        // в реальной БД сама обновляет все ссылки (cascade update) - здесь нам приходится делать это вручную (т.к. вместо БД - массив)
        TestData.tasks.forEach(task => {
            if (task.category && task.category.id === id) {
                task.category = null;
            }
        });

        const tmpCategory = TestData.categories.find(t => t.id === id); // удаляем по id
        TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1);

        return of(tmpCategory);

    }

    get(id: number): Observable<CategoryModel> {
        return undefined;
    }

    getAll(): Observable<CategoryModel[]> {
        return of(TestData.categories);
    }

    search(title: string): Observable<CategoryModel[]> {
        return undefined;
    }

    update(T): Observable<CategoryModel> {
        return undefined;
    }

}
