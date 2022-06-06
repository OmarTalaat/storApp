import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Directive({
  selector: '[UniqueUserName]',
  providers: [{provide: NG_ASYNC_VALIDATORS , useExisting: UniqueUserNameDirective , multi: true }]
})
export class UniqueUserNameDirective {

  @Input() UniqueUserName!: string;

  constructor(private authService: AuthService) { }

  validate( c: AbstractControl ): Promise<ValidationErrors> | Observable<ValidationErrors | null>  {
    return this.authService.isUserExist(c.value).pipe(
      map(username => {
        return  username ? {UniqueUserName : true} : null;
      })
    );

  }

}
