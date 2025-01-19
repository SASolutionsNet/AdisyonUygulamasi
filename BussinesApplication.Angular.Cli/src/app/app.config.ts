import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutes } from './app.routing';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),  // Zone.js ile değişiklik algılama
    provideRouter(AppRoutes),  // provideRouter kullanılarak yönlendirme yapılandırması sağlanır
    provideAnimationsAsync(), provideAnimationsAsync(),  // Animasyonları asenkron olarak yükler
  ]
};
