import {PriorityModel} from './PriorityModel';
import {CategoryModel} from './CategoryModel';

export class TaskModel {

    id: number;
    title: string;
    completed?: boolean;
    priority?: PriorityModel;
    category?: CategoryModel;
    date?: Date;

    constructor(id: number, title: string, completed: boolean, priority?: PriorityModel, category?: CategoryModel, date?: Date) {
        this.id = id;
        this.title = title;
        this.completed = completed;
        this.priority = priority;
        this.category = category;
        this.date = date;
    }

}
