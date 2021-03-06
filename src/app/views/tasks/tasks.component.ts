import {Component, Input, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {DataHandlerService} from '../../services/data-handler.service';
import {TaskModel} from '../../models/TaskModel';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {EditTaskDialogComponent} from '../../dialog/edit-task-dialog/edit-task-dialog.component';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {CategoryModel} from '../../models/CategoryModel';
import {PriorityModel} from '../../models/PriorityModel';
import {OperatorType} from '../../dialog/OperatorType';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

    // поля для таблицы (те, что отображают данные из задачи - должны совпадать с названиями переменных класса)
    private displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operations', 'select'];
    private dataSource: MatTableDataSource<TaskModel>; // контейнер - источник данных для таблицы

    // ссылки на компоненты таблицы
    @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) private sort: MatSort;

    private tasks: TaskModel[]; // напрямую не присваиваем значения в переменную, только через @Input
    // private priorities: PriorityModel[]; // напрямую не присваиваем значения в переменную, только через @Input

    @Output()
    deleteTask = new EventEmitter<TaskModel>();

    @Output()
    updateTask = new EventEmitter<TaskModel>();

    @Output()
    changeStatus = new EventEmitter<TaskModel>();

    // выбрали категорию из списка
    @Output()
    selectCategory = new EventEmitter<CategoryModel>(); // нажали на категорию из списка задач

    // private selectedCategory: CategoryModel;

    @Output()
    filterByTitle = new EventEmitter<string>();

    @Output()
    filterByStatus = new EventEmitter<boolean>();

    @Output()
    filterByPriority = new EventEmitter<PriorityModel>();

    @Output()
    addTask = new EventEmitter<TaskModel>();

    // поиск
    private searchTaskText: string; // текущее значение для поиска задач
    private selectedStatusFilter: boolean = null;   // по-умолчанию будут показываться задачи по всем статусам (решенные и нерешенные)
    private selectedPriorityFilter: PriorityModel | null;   // по-умолчанию будут показываться задачи по всем приоритетам

    // текущие задачи для отображения на странице
    @Input('tasks')
    private set setTasks(tasks: TaskModel[]) { // напрямую не присваиваем значения в переменную, только через @Input
        this.tasks = tasks;
        this.fillTable();
    }

    @Input()
    priorities: PriorityModel[];

    @Input()
    selectedCategory: CategoryModel;

    constructor(
        private dataHandler: DataHandlerService,
        private dialog: MatDialog  // работа с диалоговым окном
    ) {
    }

    ngOnInit() {
        // датасорс обязательно нужно создавать для таблицы, в него присваивается любой источник (БД, массивы, JSON и пр.)
        this.dataSource = new MatTableDataSource();

        this.fillTable();  // заполняем таблицы данными (задачи) и всеми метаданными

        this.onSelectCategory(null); // для корректной работы сортировки и пагинации
    }

    toggleTaskCompleted(task: TaskModel) {
        task.completed = !task.completed;
        this.updateTask.emit(task);
    }

    // в зависимости от статуса задачи - вернуть цвет названия
    private getPriorityColor(task: TaskModel): string {

        // цвет завершенной задачи
        if (task.completed) {
            return '#f8f9fa'; // TODO вынести цвета в константы (magic strings, magic numbers)
        }
        // второй вариант решения задачи цвет завершенной задачи
        if (!task.completed && task.priority && task.priority.color) {
            return task.priority.color;
        }

        return '#fff';

    }

    // показывает задачи с применением всех текущий условий (категория, поиск, фильтры и пр.)
    private fillTable(): void {

        if (!this.dataSource) {
            return;
        }

        this.dataSource.data = this.tasks; // обновить источник данных (т.к. данные массива tasks обновились)


        this.addTableObjects();


        // когда получаем новые данные..
        // чтобы можно было сортировать по столбцам "категория" и "приоритет", т.к. там не примитивные типы, а объекты
        // @ts-ignore - показывает ошибку для типа даты, но так работает, т.к. можно возвращать любой тип
        this.dataSource.sortingDataAccessor = (task, colName) => {

            // по каким полям выполнять сортировку для каждого столбца
            switch (colName) {
                case 'priority': {
                    return task.priority ? task.priority.id : null;
                }
                case 'category': {
                    return task.category ? task.category.title : null;
                }
                case 'date': {
                    return task.date ? task.date : null;
                }

                case 'title': {
                    return task.title;
                }
            }
        };
    }

    private addTableObjects(): void {
        this.dataSource.sort = this.sort; // компонент для сортировки данных (если необходимо)
        this.dataSource.paginator = this.paginator; // обновить компонент постраничности (кол-во записей, страниц)
    }

    // диалоговое редактирования для добавления задачи
    private openEditTaskDialog(task: TaskModel): void {

        // открытие диалогового окна
        const dialogRef = this.dialog.open(EditTaskDialogComponent, {
            data: [task, 'Edit Task', OperatorType.EDIT],
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe(result => {
            // обработка результатов

            if (result === 'activate') {
                task.completed = true;
                this.updateTask.emit(task);
                return;
            }

            if (result === 'complete') {
                task.completed = false;
                this.updateTask.emit(task);
                return;
            }

            if (result === 'delete') {
                this.deleteTask.emit(task);
                return;
            }

            if (result as TaskModel) { // если нажали ОК и есть результат
                this.updateTask.emit(task);
                return;
            }

        });
    }

    openDeletedDialog(task: TaskModel): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '500px',
            data: {
                dialogTitle: 'Confirm action',
                message: `Are you sure!!! you want to delete the task: "${task.title}"?`
            },
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) { // если нажали удалить
                this.deleteTask.emit(task);
            }
        });
    }

    onSelectCategory(category: CategoryModel) {
        // вызываем внешний обработчик и передаем туда выбранную категорию
        this.selectCategory.emit(category);

    }

    // фильтрация по названию
    private onFilterByTitle() {
        this.filterByTitle.emit(this.searchTaskText);
    }

    // фильтрация по статусу
    private onFilterByStatus(value: boolean) {

        // на всякий случай проверяем изменилось ли значение (хотя сам UI компонент должен это делать)
        if (value !== this.selectedStatusFilter) {
            this.selectedStatusFilter = value;
            this.filterByStatus.emit(this.selectedStatusFilter);
        }
    }

    // фильтрация по приоритету
    private onFilterByPriority(value: PriorityModel | null) {
        if (value !== this.selectedPriorityFilter) {
            this.selectedPriorityFilter = value;
            this.filterByPriority.emit(this.selectedPriorityFilter);
        }
    }


    // диалоговое окно для добавления задачи
    private openAddTaskDialog() {
        // то же самое, что и при редактировании, но только передаем пустой объект Task
        const task = new TaskModel(null, '', false, null, this.selectedCategory);
        const dialogRef = this.dialog.open(EditTaskDialogComponent, {data: [task, 'Add Task', OperatorType.ADD]});

        dialogRef.afterClosed().subscribe(result => {
            if (result) { // если нажали ОК и есть результат
                this.addTask.emit(task);
            }
        });

    }
}
