import {Component, OnInit} from '@angular/core';
import {DataHandlerService} from '../../services/data-handler.service';
import {CategoryModel} from '../../models/CategoryModel';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

    selectCategory: CategoryModel;

    categories: CategoryModel[];

    constructor(private dataHandler: DataHandlerService) {
    }

    ngOnInit() {
        this.categories = this.dataHandler.fillCategories();
    }

    getTaskByCategory(category: CategoryModel) {
        this.selectCategory = category;
        this.dataHandler.fillTasksByCategory(category);
    }
}
