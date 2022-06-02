import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarioLogueado : string  = "";

  constructor(private authService : AuthService) { }

  cerrarSesion()
  {
    this.authService.logOutUsuario();
  }

  ngOnInit(): void {
    this.authService.getUsuarioLogueado().then((res) =>{
      console.log(res?.email);
      this.usuarioLogueado = res?.email?.toString() ?? '';
    })
  } 


}
