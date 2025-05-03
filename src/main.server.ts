import 'zone.js/node';  // Importa zone.js para o ambiente Node.js
import { AppComponent } from './app/app.component';  // Componente principal
import { bootstrapApplication } from '@angular/platform-browser';


const bootstrap = () => bootstrapApplication(AppComponent);

export default bootstrap;
