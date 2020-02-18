import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CategoriesComponent} from './views/categories/categories.component';
import {TasksComponent} from './views/tasks/tasks.component';
import {
    MatButtonModule, MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatNativeDateModule, MatOptionModule,
    MatPaginatorModule, MatSelectModule,
    MatSortModule,
    MatTableModule
} from '@angular/material';
import {EditTaskDialogComponent} from './dialog/edit-task-dialog/edit-task-dialog.component';
import {FormsModule} from '@angular/forms';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        CategoriesComponent,
        TasksComponent,
        EditTaskDialogComponent,
        ConfirmDialogComponent
    ],
    imports: [
        BrowserModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatOptionModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    providers: [],
    entryComponents: [
        EditTaskDialogComponent,
        ConfirmDialogComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
