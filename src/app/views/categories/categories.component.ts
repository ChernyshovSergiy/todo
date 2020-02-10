import {Component, OnInit} from '@angular/core';
import {DataHandlerService} from '../../services/data-handler.service';
import {CategoryModel} from '../../models/CategoryModel';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

    categories: CategoryModel[];

    constructor(private dataHandler: DataHandlerService) {
    }

    ngOnInit() {
        this.categories = this.dataHandler.fillCategories();
        console.log(this.categories);
    }

    getTaskByCategory(category: CategoryModel) {
        this.dataHandler.getTasksByCategory(category);
    }
}
