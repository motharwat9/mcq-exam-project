import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatchConfirmpass():ValidatorFn{
   return (formGroup:AbstractControl): ValidationErrors | null =>{

      let passControl = formGroup.get('password');
      let passConfirmControl = formGroup.get('confirmPassword');
      let valErr={'UnmatchedPassword': {'pass': passControl?.value, 'confrim': passConfirmControl?.value}}
      if (!passControl ||!passConfirmControl ||!passControl.value ||!passConfirmControl.value) 
      return null;
      return (passControl.value == passConfirmControl.value)?null:valErr

   }
}
export function passwordMatchName():ValidatorFn{
   return (formGroup:AbstractControl): ValidationErrors | null =>{

      let passControl = formGroup.get('password');
      let nameControl = formGroup.get('username');
      let nameErr={'nameMatchedPassword': {'pass': passControl?.value, 'name': nameControl?.value}}
      let nameNotspace=nameControl?.value.replace(/\s/g,"");
      if(!nameControl ||!passControl || !nameControl.value || !passControl.value)
         return null
      return(passControl?.value.includes(nameNotspace))?nameErr:null

   }
}