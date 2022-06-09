import { UserInterface } from './../../models/userinterface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { comparePassword } from './validators/passwordValidators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public userRegisterForm: FormGroup;
  public submitted:boolean = false;

  constructor(private formBuilder: FormBuilder) {

    this.userRegisterForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3), Validators.pattern('[a-zA-Z0-9 ]*')]],
      passwordRepeat: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3), Validators.pattern('[a-zA-Z0-9 ]*')]],
    },{
      validator: comparePassword('password', 'passwordRepeat')
    })

   }

  ngOnInit(): void {
  }

  public onSubmit(): void{
    this.submitted = true

    if (this.userRegisterForm.valid){

      const user: UserInterface = {
        username: this.userRegisterForm.get("username")?.value,
        email: this.userRegisterForm.get("email")?.value,
        password: this.userRegisterForm.get("password")?.value,
        passwordRepeat: this.userRegisterForm.get("username")?.value,
      };
      console.log("USER ->", user);
      this.userRegisterForm.reset();
      this.submitted = false

    }
  }
}
