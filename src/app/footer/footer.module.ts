import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [FooterComponent], // ✅ Declare the component
  imports: [CommonModule], // ✅ Import CommonModule (needed for Angular directives)
  exports: [FooterComponent] // ✅ Export it so it can be used in other modules
})
export class FooterModule { }
