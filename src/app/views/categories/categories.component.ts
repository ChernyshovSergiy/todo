import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from '../../services/data-handler.service';
import {CategoryModel} from '../../models/CategoryModel';

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

    // для отображения иконки редактирования при наведении на категорию
    private indexMouseMove: number;

    constructor(private dataHandler: DataHandlerService) {
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
        console.log(category.title);
    }
}
