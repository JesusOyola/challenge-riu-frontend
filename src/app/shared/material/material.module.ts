import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
  exports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
})
export class MaterialModule {}
