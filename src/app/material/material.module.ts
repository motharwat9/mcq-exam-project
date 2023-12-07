import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

const materials=[
  MatButtonModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatIconModule
]
@NgModule({
  imports: [materials],
  exports:[materials]
})
export class MaterialModule { }
