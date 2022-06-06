import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValidator } from '../validator/validate-password';
import { User } from '../member/model/user';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  user!: User;
  registerForm!: FormGroup;
  fieldTextType: boolean | undefined;
  fieldconfirmTextType: boolean | undefined;



  constructor(private authService: AuthService, private router: Router,
    private alertify: AlertifyService, public fb: FormBuilder) { }

  ngOnInit() {
    this.creatRegisterForm();
  }


  creatRegisterForm() {
    this.registerForm = this.fb.group({
       username: ['', Validators.compose([Validators.required
        , Validators.pattern('^(?=[a-zA-Z._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$')])],
      password: ['', [Validators.required] ],
      confirmPassword: ['', Validators.required]
    }, {validator: ConfirmedValidator('password', 'confirmPassword')});
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.alertify.success('Registration Successful');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['categorylist']);
        });
      });
    }
  }

  get f(): { [key: string]: AbstractControl; }
  {
    return this.registerForm.controls;
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleFieldconfirmTextType() {
    this.fieldconfirmTextType = !this.fieldconfirmTextType;
  }
  cancel() {

    this.registerForm.reset();
    this.router.navigate(['/home']);
    }

}
