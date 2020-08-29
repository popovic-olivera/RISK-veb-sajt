import { AbstractControl } from '@angular/forms';

export function processError(object: AbstractControl): string {
    if (object.hasError('required')) {
        return 'Ovo je obavezno polje';
    } else if (object.hasError('email')) {
        return 'Ovo nije ispravna imejl adresa';
    } else if (object.hasError('notMatching')) {
        return 'Lozinke se ne poklapaju';
    } else if (object.hasError('wrongValue')) {
        return 'Ovo nije ispravan format lozinke';
    } else {
        return 'Došlo je do greške';
    }
}