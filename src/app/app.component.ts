import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root', // O seletor usado no HTML, como <app-root></app-root>
  templateUrl: './app.component.html', // Referência para o template HTML
  styleUrls: ['./app.component.scss'], // Arquivo CSS ou SCSS (se necessário)
})
export class AppComponent implements OnInit {
  title = 'test-app'; // Variável de exemplo, você pode alterar conforme necessário
  currentLanguage = 'en';

  constructor(private translate: TranslateService) {
    console.log('Current translations:', this.translate.getTranslation('en'));
    translate.setDefaultLang('en');
    translate.use('en');
    this.detectLanguage();
  }

  ngOnInit() {
    this.setLanguage(this.currentLanguage);
  }

  private detectLanguage() {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const spanishTimezones = [
      'America/Mexico_City',
      'America/Bogota',
      'Europe/Madrid',
    ];

    if (spanishTimezones.includes(timezone)) {
      this.currentLanguage = 'es';
    }
  }

  setLanguage(lang: string) {
    console.log('Changing language to:', lang);
    this.currentLanguage = lang;
    this.translate.use(lang);
  }
}
