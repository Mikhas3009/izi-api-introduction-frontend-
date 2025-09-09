import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';

import { Observable, map } from 'rxjs';
import { Task, TaskService } from '../services/task.service';
import { BaseResponseInterface } from '../interfaces/base-response.interface';

@Component({
    selector: 'app-task',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        ButtonModule,
        CheckboxModule,
        DialogModule,
        InputTextModule,
        ConfirmDialogModule,
        ToastModule
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent {
    tasks$!: Observable<Task[]>;
    displayDialog = false;
    newTaskTitle = '';

    constructor(
        private taskService: TaskService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) { }

    ngOnInit(): void {
        this.loadTasks();
    }

    loadTasks(): void {
        this.tasks$ = this.taskService.getTasks().pipe(
            map((response: BaseResponseInterface<Task[]>) => response.data ?? [])
        );
    }

    toggleCompleted(task: Task): void {
        this.taskService.updateTask(task.taskID, !task.taskIsCompleted).subscribe(response => {
            if (response.success && response.data) {
                task.taskIsCompleted = response.data.taskIsCompleted;
                this.messageService.add({ severity: 'info', summary: 'Обновлено', detail: 'Статус изменён' });
            }
        });
    }

    deleteTask(task: Task): void {
        this.confirmationService.confirm({
            message: 'Вы уверены, что хотите удалить задачу?',
            accept: () => {
                this.taskService.deleteTask(task.taskID).subscribe(response => {
                    if (response.success) {
                        this.loadTasks();
                        this.messageService.add({ severity: 'success', summary: 'Удалено', detail: 'Задача удалена' });
                    }
                });
            }
        });
    }

    openDialog(): void {
        this.displayDialog = true;
    }

    createTask(): void {
        if (!this.newTaskTitle.trim()) return;
        this.taskService.addTask(this.newTaskTitle).subscribe(response => {
            if (response.success) {
                this.newTaskTitle = '';
                this.displayDialog = false;
                this.loadTasks();
                this.messageService.add({ severity: 'success', summary: 'Создано', detail: 'Задача добавлена' });
            }
        });
    }
}
