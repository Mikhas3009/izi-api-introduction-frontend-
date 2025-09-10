import { Component, signal } from '@angular/core';
import { TaskComponent } from './components/task.component';

@Component({
    selector: 'app-root',
    imports: [TaskComponent],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {
    protected readonly title = signal('frontend');
}
