import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afauth: AngularFireAuth) { }

  async login(email : string , password : string) : Promise<any>
  {
    try
    {
      const result = await this.afauth.signInWithEmailAndPassword(email,password);      
      return result;
    }
    catch(error)
    {
      console.log(error);
    }
  }

  async register(email : string, password : string) : Promise<any>
  {
    try
    {
      const result = await this.afauth.createUserWithEmailAndPassword(email,password);
      (await result).user?.sendEmailVerification();
      return result;
    }
    catch(error)
    {
      console.log(error);
    }
  }

  async enviarVerificacionEmail() : Promise<void>
  {
    return (await this.afauth.currentUser)?.sendEmailVerification();
  }

  async getUsuarioLogueado()
  {
    return await firstValueFrom(this.afauth.authState);
  }

  async logOutUsuario()
  {
    try
    {
      await this.afauth.signOut();
      location.reload();
    }
    catch(error)
    {
      console.log(error);
    }
  }

}
