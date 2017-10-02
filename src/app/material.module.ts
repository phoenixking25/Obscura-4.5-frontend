import { MdButtonModule, MdCheckboxModule, MdSnackBarModule, MdCardModule, MdStepperModule, MdMenuModule } from '@angular/material';
import { NgModule } from '@angular/core';


@NgModule({
  imports: [MdButtonModule, MdCheckboxModule, MdSnackBarModule, MdCardModule, MdStepperModule, MdButtonModule, MdMenuModule],
  exports: [MdButtonModule, MdCheckboxModule, MdSnackBarModule, MdCardModule, MdStepperModule, MdButtonModule, MdMenuModule],
})
export class MaterialModule { }
