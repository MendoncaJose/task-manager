import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule, MatSelectModule, FormsModule],
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent {
  currentLang: string;

  constructor(private translate: TranslateService) {
    this.currentLang = translate.currentLang || 'en';
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
