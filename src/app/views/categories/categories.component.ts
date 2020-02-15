import {Component, Input, OnInit} from '@angular/core';
import {DataHandlerService} from '../../services/data-handler.service';
import {CategoryModel} from '../../models/CategoryModel';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

    // @Input()
    selectCategory: CategoryModel;

    @Input()
    categories: CategoryModel[];

    constructor(private dataHandler: DataHandlerService) {
    }

    ngOnInit() {
        // this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    }

    getTaskByCategory(category: CategoryModel) {
        this.selectCategory = category;
        this.dataHandler.fillTasksByCategory(category);
    }
}
