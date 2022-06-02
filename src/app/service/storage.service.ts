import { Injectable } from '@angular/core';
import { Storage,ref} from '@angular/fire/storage'
import { getDownloadURL, uploadBytes } from 'firebase/storage';



@Injectable({
  providedIn: 'root'
})
export class StorageService {


  urlsPaciente : any[] = [];

  constructor(private storage : Storage) { 
  }

  async subirImagen(tipo: string,fecha : any, nombre : string, imagen : any)
  {
        //this.urlsPaciente.splice(0);

        if(tipo == "Paciente")
        {
          for(let i = 0;i<2;i++)
          {
            const imgRef = ref(this.storage,`pacientes/${nombre + "_" + fecha + "_imagen_" + i}`);

            const aux = await uploadBytes(imgRef,imagen[i]);

            this.urlsPaciente[i] = await getDownloadURL(imgRef);
          }
        }

        if(tipo == "Especialista")
        {
            const imgRef = ref(this.storage,`especialistas/${nombre + "_" + fecha + "_imagen_1"}`);

            const aux = await uploadBytes(imgRef,imagen[0]);

            this.urlsPaciente[0] = await getDownloadURL(imgRef);

        }

        return this.urlsPaciente;
  }
}
