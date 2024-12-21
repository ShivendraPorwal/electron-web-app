import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

if (window && window.process && window.process.type === 'renderer') {
  console.log('App Running in Electron renderer process');
}
