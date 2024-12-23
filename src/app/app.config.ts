import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import Aura from '@primeng/themes/lara';
// import { providePrimeNG } from 'primeng/config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    // providePrimeNG({ // TODO: prime ng 19
    //   theme: {
    //     preset: Aura,
    //   },
    // }),
  ],
};
