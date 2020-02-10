import {Injectable} from '@angular/core';
import {CategoryModel} from '../models/CategoryModel';
import {TestData} from '../data/TestData';
import {TaskModel} from '../models/TaskModel';

@Injectable({
    providedIn: 'root'
})
export class DataHandlerService {

    constructor() {
    }

    fillCategories(): CategoryModel[] {
        return TestData.categories;
    }

    fillTasks(): TaskModel[] {
        return TestData.tasks;
    }
}
