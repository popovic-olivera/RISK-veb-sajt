import { AbstractControl, FormGroup } from '@angular/forms';

export function passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    
    if ((control.value && control.value.length < 8) || 
        !/[A-Z]/.test(control.value) || !/[0-9]/.test(control.value)) {
            
        return {wrongValue: true};
    }

    return null;
}

export function passwordsEqual(form: FormGroup): { [key: string]: boolean } | null {
    
    const pass = form.get('password').value;
    const confirmPass = form.get('confirmPassword').value

    if (pass && confirmPass && pass !== confirmPass) {
        form.get('confirmPassword').setErrors({
          notMatching: true
        });
    }

    return null;   
}