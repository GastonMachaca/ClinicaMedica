import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  form: any = FormGroup;
  
  submitted = false;

  constructor(private conectionService : AuthService, private formBuilder : FormBuilder,private router: Router) { }

  Login()
  {
    this.conectionService.login(this.form.value.email,this.form.value.password).then(user =>{

      if(this.form.value.email == "admin@hotmail.com")
      {
        this.router.navigate(['/usuarios']);
      }
      else
      {
        if(user && user.user.emailVerified)
        {
          this.router.navigate(['/usuarios']);
        }
        else
        {
          alert("Falta verificar correo");
        }
      }
    }
    )
    .catch(error => {
        console.error('Error: ', error);
    });
  }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required,Validators.minLength(6)]]
    });
  }

  get f() { return this.form.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
        return;
    }
    
    if(this.submitted)
    {
      this.Login();
    }
  }

  accesoRapido()
  {
    this.form.setValue({
      email: "gastonmachaca1@gmail.com",
      password:"123456"
     });

    this.onSubmit();
  }


  admin()
  {
    this.form.setValue({
      email: "admin@hotmail.com",
      password:"123456"
     });
  }
}
