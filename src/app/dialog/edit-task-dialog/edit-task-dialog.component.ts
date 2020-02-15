import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {TaskModel} from '../../models/TaskModel';
import {DataHandlerService} from '../../services/data-handler.service';

@Component({
    selector: 'app-edit-task-dialog',
    templateUrl: './edit-task-dialog.component.html',
    styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

    constructor(
        private dialogRef: MatDialogRef<EditTaskDialogComponent>, // для возможности работы с данным диалоговым окном
        @Inject(MAT_DIALOG_DATA) private data: [TaskModel, string], // данные, которые передали в диалоговое окно
        private dataHandler: DataHandlerService, // ссылка на сервисы для работы с данными
        private dialog: MatDialog // для открітия нового диологового окна из текущего - например для подтверждения удаления
    ) {
    }

    private dialogTitle: string; // заголовок диологового окна
    private task: TaskModel; // задача, для создания или редактирования

    ngOnInit() {
        this.task = this.data[0]; // задача, для создания или редактирования
        this.dialogTitle = this.data[1]; // заголовок диологового окна
    }

}
