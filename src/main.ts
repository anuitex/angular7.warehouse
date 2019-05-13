//Vendors
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
//Models
import { AppModule } from '@app/app.module';
//Environments
import { environment } from '@environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch((err) => console.error(err));
