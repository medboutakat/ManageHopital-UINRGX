import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule, MatCellDef } from '@angular/material/table';


const Materiallist = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatSelectModule,
  MatSnackBarModule,
  MatGridListModule,
  BrowserAnimationsModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressBarModule,
  MatCardModule,
  MatIconModule,

  MatDialogModule,

  MatTableModule,
]

@NgModule({
  declarations: [

  ],
  imports: [
    Materiallist,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatIconModule,

  ],
  exports: [
    Materiallist,
    MatToolbarModule,
    MatTableModule,
  ]
})
export class MaterialModule { }


