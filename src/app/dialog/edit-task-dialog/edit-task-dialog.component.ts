import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material';
import {TaskModel} from '../../models/TaskModel';
import {CategoryModel} from '../../models/CategoryModel';
import {DataHandlerService} from '../../services/data-handler.service';
import {PriorityModel} from '../../models/PriorityModel';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-edit-task-dialog',
    templateUrl: './edit-task-dialog.component.html',
    styleUrls: ['./edit-task-dialog.component.css']
})

// редактирование/создание задачи
export class EditTaskDialogComponent implements OnInit {

    private dialogTitle: string; // заголовок окна
    private task: TaskModel; // задача для редактирования/создания
    // чтобы изменения не сказывались на самой задаче и можно было отменить изменения
    private tmpTitle: string;

    private categories: CategoryModel[];
    private tmpCategory: CategoryModel;

    private priorities: PriorityModel[];
    private tmpPriority: PriorityModel;

    // сохраняем все значения в отдельные переменные

    constructor(
        private dialogRef: MatDialogRef<EditTaskDialogComponent>, // для возможности работы с текущим диалог. окном
        @Inject(MAT_DIALOG_DATA) private data: [TaskModel, string], // данные, которые передали в диалоговое окно
        private dataHandler: DataHandlerService, // ссылка на сервис для работы с данными
        private dialog: MatDialog, // для открытия нового диалогового окна (из текущего) - например для подтверждения удаления
    ) {
    }

    ngOnInit() {
        this.task = this.data[0]; // задача для редактирования/создания
        this.dialogTitle = this.data[1]; // текст для диалогового окна

        // инициализация начальных значений (записывам в отдельные переменные
        // чтобы можно было отменить изменения, а то будут сразу записываться в задачу)
        this.tmpTitle = this.task.title;
        this.tmpCategory = this.task.category;
        this.tmpPriority = this.task.priority;

        this.dataHandler.getAllCategories().subscribe(items => this.categories = items);
        this.dataHandler.getAllPriorities().subscribe(items => this.priorities = items);

    }

    // нажали ОК
    private onConfirm(): void {

        // считываем все значения для сохранения в поля задачи
        this.task.title = this.tmpTitle;
        this.task.category = this.tmpCategory;
        this.task.priority = this.tmpPriority;


        // передаем добавленную/измененную задачу в обработчик
        // что с ним будут делать - уже на задача этого компонента
        this.dialogRef.close(this.task);

    }

    // нажали отмену (ничего не сохраняем и закрываем окно)
    private onCancel(): void {
        this.dialogRef.close(null);
    }

    // нажали Удалить
    private delete() {

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '500px',
            data: {
                dialogTitle: 'Confirm action',
                message: `Are you sure!!! you want to delete the task: "${this.task.title}"?`
            },
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.dialogRef.close('delete'); // нажали удалить
            }
        });
    }

}
