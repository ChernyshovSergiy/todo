import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {OperatorType} from '../OperatorType';

@Component({
    selector: 'app-edit-category-dialog',
    templateUrl: './edit-category-dialog.component.html',
    styleUrls: ['./edit-category-dialog.component.css']
})
export class EditCategoryDialogComponent implements OnInit {

    constructor(
        private dialogRef: MatDialogRef<EditCategoryDialogComponent>, // для работы с текущим диалог. окном
        @Inject(MAT_DIALOG_DATA) private data: [string, string, OperatorType], // данные, которые передали в диалоговое окно
        private dialog: MatDialog // для открытия нового диалогового окна (из текущего) - например для подтверждения удаления
    ) {
    }

    private dialogTitle: string; // текст для диалогового окна
    private categoryTitle: string; // текст для названия категории (при реактировании или добавлении)
    private OperatorType: OperatorType;

    ngOnInit() {

        // получаем переданные в диалоговое окно данные
        this.categoryTitle = this.data[0];
        this.dialogTitle = this.data[1];
        this.OperatorType = this.data[2];

    }

    // нажали ОК
    private onConfirm() {
        this.dialogRef.close(this.categoryTitle);
    }

    // нажали отмену (ничего не сохраняем и закрываем окно)
    private onCancel() {
        this.dialogRef.close(false);
    }

    // нажали Удалить
    private delete() {

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '500px',
            data: {
                dialogTitle: 'Подтвердите действие',
                message: `Вы действительно хотите удалить категорию: "${this.categoryTitle}"? (сами задачи не удаляются)`
            },
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.dialogRef.close('delete'); // нажали удалить
            }
        });
    }

    private canDelete(): boolean {
        return this.OperatorType === OperatorType.EDIT;
    }
}
