import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from '../../services/data-handler.service';
import {CategoryModel} from '../../models/CategoryModel';
import {MatDialog} from '@angular/material';
import {EditCategoryDialogComponent} from '../../dialog/edit-category-dialog/edit-category-dialog.component';
import {OperatorType} from '../../dialog/OperatorType';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

    @Input()
    categories: CategoryModel[];

    // выбрали категорию из списка
    @Output()
    selectCategory = new EventEmitter<CategoryModel>();

    @Input()
    selectedCategory: CategoryModel;

    // удалили категорию
    @Output()
    deleteCategory = new EventEmitter<CategoryModel>();

    // изменили категорию
    @Output()
    updateCategory = new EventEmitter<CategoryModel>();

    // добавление категории
    @Output()
    addCategory = new EventEmitter<string>();

    // для отображения иконки редактирования при наведении на категорию
    private indexMouseMove: number;

    constructor(
        private dataHandler: DataHandlerService,
        private dialog: MatDialog, // внедряем MatDialog, чтобы работать с диалоговыми окнами
    ) {
    }

    ngOnInit() {
        // this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    }

    showTasksByCategory(category: CategoryModel) {

        // если не изменилось значение, ничего не делать (чтобы лишний раз не делать запрос данных)
        if (this.selectedCategory === category) {
            return;
        }

        this.selectedCategory = category; // сохраняем выбранную категорию

        // вызываем внешний обработчик и передаем туда выбранную категорию
        this.selectCategory.emit(this.selectedCategory);
    }

    // сохраняет индекс записи категории, над который в данный момент проходит мышка (и там отображается иконка редактирования)
    private showEditIcon(index: number) {
        this.indexMouseMove = index;

    }

    // диалоговое окно для редактирования категории
    private openEditDialog(category: CategoryModel) {
        const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
            data: [category.title, 'Edit Category', OperatorType.EDIT],
            width: '400px'
        });

        dialogRef.afterClosed().subscribe(result => {

            if (result === 'delete') { // нажали удалить
                this.deleteCategory.emit(category); // вызываем внешний обработчик
                return;
            }

            if (typeof (result) === 'string') { // нажали сохранить
                category.title = result as string;

                this.updateCategory.emit(category); // вызываем внешний обработчик
                return;
            }
        });
    }

    // открытие диологового окна для добовления категории
    openAddCategoryDialog() {
        const dialogRef = this.dialog.open(EditCategoryDialogComponent, {data: ['', 'Add Category', OperatorType.ADD]});
        dialogRef.afterClosed().subscribe(result => {
            if (result) { // если нажали ок и есть результат
                this.addCategory.emit(result as string); // вызываем внешний обработчик;
            }
        });
    }
}
