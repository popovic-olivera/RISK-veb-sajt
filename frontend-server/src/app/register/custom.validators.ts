import { FormGroup } from '@angular/forms';

export function passwordValidator(form: FormGroup): null {
    
    const pass = form.get('password').value;

    if (pass) {
        if (pass.length < 8 || !/[A-Z]/.test(pass) || !/[0-9]/.test(pass)) {
            form.get('password').setErrors({ wrongValue: true });
        }
    }

    return null;
}

export function passwordsEqual(form: FormGroup): null {
    
    const pass = form.get('password').value;
    const confirmPass = form.get('confirmPassword').value;

    if (pass && confirmPass && pass !== confirmPass) {
        form.get('confirmPassword').setErrors({ notMatching: true });
    }

    return null;   
}