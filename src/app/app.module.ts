import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // Verifique se esta linha está aqui
import { AppComponent } from './app.component';
import { TaskModule } from './pages/task.module';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, TaskModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
