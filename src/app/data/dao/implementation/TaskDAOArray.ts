import {TaskDAO} from '../interface/TaskDAO';
import {TaskModel} from '../../../models/TaskModel';
import {CategoryModel} from '../../../models/CategoryModel';
import {PriorityModel} from '../../../models/PriorityModel';
import {Observable, of} from 'rxjs';
import {TestData} from '../../TestData';


export class TaskDAOArray implements TaskDAO {
    // находит последний id (чтобы потом вставить новую запись с id, увеличенным на 1) - в реальной БД это происходит автоматически
    protected static getLastIdTask(): number {
        return Math.max.apply(Math, TestData.tasks.map(task => task.id)) + 1;
    }

    add(task: TaskModel): Observable<TaskModel> {

        // если id пустой - генерируем его
        if (task.id === null || task.id === 0) {
            task.id = TaskDAOArray.getLastIdTask();
        }
        TestData.tasks.push(task);

        return of(task);
    }

    delete(id: number): Observable<TaskModel> {

        const taskTmp = TestData.tasks.find(t => t.id === id); // удаляем по id
        TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1);

        return of(taskTmp);

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


    // поиск задач по параметрам
    // если значение null - параметр не нужно учитывать при поиске
    search(
        category: CategoryModel,
        searchText: string,
        status: boolean,
        priority: PriorityModel
    ): Observable<TaskModel[]> {

        return of(this.searchTasks(category, searchText, status, priority));

    }

    private searchTasks(
        category: CategoryModel,
        searchText: string,
        status: boolean,
        priority: PriorityModel
    ): TaskModel[] {

        let allTasks = TestData.tasks;


        // поочереди применяем все условия (какие не пустые)
        if (status != null) {
            allTasks = allTasks.filter(task => task.completed === status);
        }

        if (category != null) {
            allTasks = allTasks.filter(task => task.category === category);
        }

        if (priority != null) {
            allTasks = allTasks.filter(task => task.priority === priority);
        }

        if (searchText != null) {
            allTasks = allTasks.filter(
                task =>
                    task.title.toUpperCase()
                        .includes(searchText.toUpperCase()) // учитываем текст поиска (если '' - возвращаются все значения)
            );
        }


        return allTasks; // отфильтрованный массив
    }

    update(task: TaskModel): Observable<TaskModel> {

        const taskTmp = TestData.tasks.find(t => t.id === task.id); // обновляем по id
        TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1, task);

        return of(task);

    }
    // кол-во всех задач в заданной категории (если category === null то для всех категорий)
    getTotalTasksInCategory(category: CategoryModel): Observable<number> {
        return of(this.searchTasks(category, null, null, null).length);
    }
    // кол-во завершенных задач в заданной категории (если category === null то для всех категорий)
    getCompletedTaskInCategory(category: CategoryModel): Observable<number> {
        return of(this.searchTasks(category, null, true, null).length);
    }
    // кол-во не завершенных задач в заданной категории (если category === null то для всех категорий)
    getUncompletedTaskInCategory(category: CategoryModel): Observable<number> {
        return of(this.searchTasks(category, null, false, null).length);
    }
    // кол-во всех задач
    getUncompletedTotalTaskCount(): Observable<number> {
        return of(TestData.tasks.length);
    }

}
