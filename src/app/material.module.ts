import { MdButtonModule, MdCheckboxModule, MdProgressBarModule, MdSnackBarModule,MdInputModule, MdCardModule, MdStepperModule, MdMenuModule } from '@angular/material';
import { NgModule } from '@angular/core';


@NgModule({
  imports: [MdButtonModule, MdCheckboxModule, MdSnackBarModule, MdProgressBarModule, MdCardModule,MdInputModule, MdStepperModule, MdButtonModule, MdMenuModule],
  exports: [MdButtonModule, MdCheckboxModule, MdSnackBarModule, MdProgressBarModule, MdCardModule,MdInputModule, MdStepperModule, MdButtonModule, MdMenuModule],
})
export class MaterialModule { }
