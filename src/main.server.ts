import { platformDynamicServer } from '@angular/platform-server';
import { AppServerModule } from './app/app.server.module';

export default function bootstrap() {
  return platformDynamicServer()
    .bootstrapModule(AppServerModule)
    .catch(err => console.error(err));
}
