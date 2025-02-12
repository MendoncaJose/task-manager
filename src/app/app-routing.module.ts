import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksListComponent } from './pages/task-list/task-list.component';

const routes: Routes = [
  { path: '', component: TasksListComponent }, // Rota principal
  {
    path: 'tasks',
    loadChildren: () => import('./pages/task.module').then((m) => m.TaskModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
