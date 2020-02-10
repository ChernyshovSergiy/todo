import { Injectable } from '@angular/core';
import {CategoryModel} from '../models/CategoryModel';
import {TestData} from '../data/TestData';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  constructor() { }

  fillCategories(): CategoryModel[] {
      return TestData.categories;
  }
}
