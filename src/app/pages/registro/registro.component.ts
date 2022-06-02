import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl,FormGroup,Validators} from '@angular/forms';
import { PacientesService } from 'src/app/service/pacientes.service';
import { StorageService } from 'src/app/service/storage.service';
import { DatePipe } from '@angular/common';
import { EspecialistasService } from 'src/app/service/especialistas.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  dato: Date = new Date();
  pipe = new DatePipe('en-US');
  fechaActual : any = null;


  perfiles: string[] = ['Paciente', 'Especialista'];
  especialidades: any[] = ['Dermatologo', 'Pediatra'];
  
  imagenEspecialista : any[] = [];
  imagenesPaciente : any[] = [];
  
  failImagen : boolean = false;
  mensajeImagen : string = "No se cargo el archivo";
  eventoImagen : any;
  exitoImagen: boolean = false;

  jsonPacientes : any;
  jsonEspecialistas : any;

  nombre : string = "";
  edad : number = 0;
  dni : number = 0;
  especialidad : string = "";
  newEspecialidad : string = "";
  obraSocial : string = "";
  email : string = "";
  password : string = "";

  errorEdad : string = ""; 
  extraEspecialidad: FormGroup;
  formulario: FormGroup;
  seleccion : string = "";
  opciones : string = "";
  nuevaEspecialidad : boolean = false;
  elementoEspecialidad : string = "";
  submitted : boolean = false;
  newSubmitted : boolean = false;

  constructor(private formBuilder : FormBuilder, 
    private storageService : StorageService, 
    private pacientesService : PacientesService, 
    private especialistaService : EspecialistasService,
    private authService : AuthService,
    private router: Router) 
    {
    this.formulario = new FormGroup({
      perfil: new FormControl(null),
      nombre : new FormControl(null),
      edad : new FormControl(null), 
      dni : new FormControl(null), 
      especialidad : new FormControl(null),
      obraSocial : new FormControl(null),
      email : new FormControl(null),
      password : new FormControl(null),
      // primeraFoto : new FormControl(null),
      // segundaFoto : new FormControl(null)
    });

    this.extraEspecialidad = new FormGroup({
      newEspecialidad : new FormControl(null)
    })
  }
  
  public onChange(event : any): void 
  { 
    const newVal = event.target.value; 
    this.seleccion = newVal; 
    this.seleccion = this.seleccion.substring(3);

    this.nombre = this.formulario.value.nombre;
    this.dni = this.formulario.value.dni;
    this.edad = this.formulario.value.edad;
    this.especialidad = this.formulario.value.especialidad;
    this.obraSocial = this.formulario.value.obraSocial;
    this.email = this.formulario.value.email;
    this.password = this.formulario.value.password;

    if(this.seleccion == "Paciente")
    {
      this.opciones = "Obra Social";

      if(this.exitoImagen == true)
      {
        this.cargarImagen(this.eventoImagen);
      }
      else
      {
        this.failImagen = false;
      }

      this.formulario = new FormGroup({
        perfil: new FormControl(this.seleccion),
        nombre: new FormControl(null),
        edad: new FormControl(null), 
        dni: new FormControl(null), 
        obraSocial: new FormControl(null),
        email: new FormControl(null),
        password: new FormControl(null)
      });

      this.asignarValidatorsPaciente(0,80);

      this.errorEdad = "Se introdujo una edad negativa";
      
    }
    else
    {
      this.opciones = "Especialidad";

      if(this.exitoImagen == true)
      {
        this.cargarImagen(this.eventoImagen);
      }
      else
      {
        this.failImagen = false;
      }
      
      this.formulario = new FormGroup({
        perfil: new FormControl(this.seleccion),
        nombre : new FormControl(null),
        edad : new FormControl(null), 
        dni : new FormControl(null), 
        especialidad : new FormControl(null),
        email : new FormControl(null),
        password : new FormControl(null),
      });

      this.extraEspecialidad = new FormGroup({
        newEspecialidad : new FormControl(null)
      })

      this.asignarValidatorsEspecialista();

      this.extraValidator();

      this.errorEdad = "Tiene que ser mayor de edad para ser especialista";
    }
  } 

  onSubmit(): void {
    this.submitted = true;

    if(this.exitoImagen == true)
    {
      if (this.formulario.invalid) 
      {
        return;
      }
      

      switch(this.seleccion)
      {
        case "Paciente":
            
            this.storageService.subirImagen(this.seleccion,this.fechaActual,this.formulario.value.nombre,this.imagenesPaciente).then(
              async (res) => {

                try
                {
                  await this.authService.register(this.formulario.value.email,this.formulario.value.password).then((user)=>{

                    this.jsonPacientes = JSON.stringify(this.formulario.value, null, 2);
  
                    let json = JSON.parse(this.jsonPacientes);
    
                    json.foto1 = res[0];
                    json.foto2 = res[1];
    
                    this.pacientesService.registrarPaciente(json);
                    
                    alert("Gracias por registrarse. Se le envio un email de verificacion a " + user.user.email);

                    this.router.navigate(['/login']);
                  })

                }catch(error){

                  alert("La cuenta ya esta en uso");
                }

              }
            )
          break;
        case "Especialista":

          this.storageService.subirImagen(this.seleccion,this.fechaActual,this.formulario.value.nombre,this.imagenEspecialista).then(
            async (res) => {

              try
              {
                await this.authService.register(this.formulario.value.email,this.formulario.value.password).then((user)=>{

                  this.jsonEspecialistas = JSON.stringify(this.formulario.value, null, 2);

                  let json = JSON.parse(this.jsonEspecialistas);
    
                  json.foto1 = res[0];
    
                  this.especialistaService.registrarEspecialista(json);

                  alert("Gracias por registrarse. Se le envio un email de verificacion a " + user.user.email);

                  this.router.navigate(['/login']);
                })

              }catch(error){

                alert("La cuenta ya esta en uso");
              }
            }
          )
          break;
      }
    }
    else
    {
      this.failImagen = true;
    }

  }

  initEspecialidad()
  {
    this.nuevaEspecialidad = true;
  }
  anadirEspecialidad()
  {
    this.newSubmitted = true;
    if (this.extraEspecialidad.invalid) {
      return;
    }

    console.log(this.extraEspecialidad.value.newEspecialidad);
    this.especialidades.push(this.extraEspecialidad.value.newEspecialidad);
    this.nuevaEspecialidad = false;
  }
  
  get f(): { [key: string]: AbstractControl } {
    return this.formulario.controls;
  }

  get fp(): { [key: string]: AbstractControl } {
    return this.extraEspecialidad.controls;
  }
  
  extraValidator()
  {
    this.extraEspecialidad = this.formBuilder.group({
      newEspecialidad: [null, Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-ZñÑá-úÁ-Ú]{0,254}')])]
    })
  }

  asignarValidatorsEspecialista()
  {
    this.formulario = this.formBuilder.group(
      {
          dni: [this.dni, Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(8),
            Validators.pattern(/^[1-8]\d{7,7}$/),
        ])],
          nombre: [this.nombre, Validators.compose([
            Validators.required,
            Validators.pattern('[a-zA-ZñÑá-úÁ-Ú]{0,254}')
        ])],
          edad: [this.edad, Validators.compose([
            Validators.required,
            Validators.min(18),
            Validators.max(80),
            Validators.pattern('^[0-9]*$')
        ])],
          perfil: [this.seleccion, Validators.compose([
            Validators.required
        ])],
        especialidad: [this.especialidad, Validators.compose([
          Validators.required
        ])],
          email: [this.email, Validators.compose([
            Validators.required, 
            Validators.email
        ])],
          password: [this.password, Validators.compose([
           Validators.required,
           Validators.minLength(6)
        ])]
      }
    );
  }

  asignarValidatorsPaciente(edadMin : number,edadMax : number)
  {
    this.formulario = this.formBuilder.group(
      {
          dni: [this.dni, Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(8),
            Validators.pattern(/^[1-8]\d{7,7}$/),
        ])],
          nombre: [this.nombre, Validators.compose([
            Validators.required,
            Validators.pattern('[a-zA-ZñÑá-úÁ-Ú]{0,254}')
        ])],
          edad: [this.edad, Validators.compose([
            Validators.required,
            Validators.min(edadMin),
            Validators.max(edadMax),
            Validators.pattern('^[0-9]*$')
        ])],
          obraSocial: [this.obraSocial, Validators.compose([
            Validators.required,
            Validators.pattern('[a-zA-ZñÑá-úÁ-Ú]{0,254}')
        ])],
          perfil: [this.seleccion, Validators.compose([
            Validators.required
        ])],
          email: [this.email, Validators.compose([
            Validators.required, 
            Validators.email
        ])],
          password: [this.password, Validators.compose([
            Validators.required,
            Validators.minLength(6)
        ])],
      }
    );
  }




  ngOnInit(): void {
    this.fechaActual = this.pipe.transform(Date.now(), 'd-M-yy, h:mm a');
  }

  cargarImagen(event : any)
  {
    this.eventoImagen = event;

    switch(this.seleccion)
    {
      case "Paciente":

        if(this.mensajeImagen != "")
        {   
          if(event.target.files.length == 2)
          {      
            this.failImagen = false;
            this.exitoImagen = true;
            
            if(this.imagenesPaciente.length > 0)
            {
              this.imagenesPaciente.splice(0);
              console.log("Numero:" + this.imagenesPaciente.length);
            }

            for(let i = 0;i<2;i++)
            {
              const file = event.target.files[i];

              this.imagenesPaciente.push(file);

              console.log(this.imagenesPaciente);
            }
          }
          else
          {
            this.failImagen = true;
            this.exitoImagen = false;
            this.mensajeImagen = "Error,debe ingresar 2 imagenes";
          }
        }
        else
        {
          console.log(this.mensajeImagen);
          if(this.mensajeImagen == "")
          {
            console.log("xd5")
            this.mensajeImagen = "Debe ingresar su Imagen";
          }
        }
      
        break;
      case "Especialista":

        if(this.mensajeImagen != "")
        {
            if(event.target.files.length == 1)
            {
              this.failImagen = false;
              this.exitoImagen = true;

              if(this.imagenEspecialista.length > 0)
              {
                this.imagenEspecialista.splice(0);
                console.log("Numero:" + this.imagenEspecialista.length);
              }
    
              const file = event.target.files[0];
              this.imagenEspecialista.push(file);

            }
            else
            {
              this.failImagen = true;
              this.exitoImagen = false;
              this.mensajeImagen = "Error,debe ingresar 1 imagen";
            }
        }
        else
        {
          if(this.mensajeImagen == "")
          {
            this.mensajeImagen = "Debe ingresar su Imagen";
          }
        }

        break;
    }
  }

}
