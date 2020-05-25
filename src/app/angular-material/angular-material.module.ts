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
import { MatPaginatorModule, MatSortModule, MatCheckbox, MatCheckboxModule, MatProgressSpinnerModule, MatAutocompleteModule, MatTooltip, MatTooltipModule, MatTabsModule } from '@angular/material';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatStepperModule } from '@angular/material/stepper';
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
  MatPaginatorModule,
  MatSortModule,
  MatCheckboxModule,
  MatStepperModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatToolbarModule,
  MatIconModule,
  MatTableModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatSortModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatBottomSheetModule,
  MatTabsModule,
]

@NgModule({
  declarations: [

  ],
  imports: [
    Materiallist,  
  ],
  exports: [
    Materiallist, 
  ],
  providers: [{ provide: MatBottomSheetRef, useValue: {} },
  { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }],
})
export class AngularMaterialModule { }


