import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class EspecialistasService {

  constructor(private firestore: AngularFirestore) { }

  public async registrarEspecialista(paciente : JSON)
  {
    const especialistasRef = this.firestore.collection('especialistas');
    const especialistas = paciente;
    especialistasRef.add({ ...especialistas }); 
  }
}
