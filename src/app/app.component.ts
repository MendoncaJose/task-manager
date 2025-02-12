import { Component } from '@angular/core';

@Component({
  selector: 'app-root', // O seletor usado no HTML, como <app-root></app-root>
  templateUrl: './app.component.html', // Referência para o template HTML
  styleUrls: ['./app.component.scss'], // Arquivo CSS ou SCSS (se necessário)
})
export class AppComponent {
  title = 'test-app'; // Variável de exemplo, você pode alterar conforme necessário
}
