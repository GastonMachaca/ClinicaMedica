import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor(private firestore: AngularFirestore) { }

  public async registrarPaciente(paciente : JSON)
  {
    const pacientesRef = this.firestore.collection('pacientes');
    const pacientes = paciente;
    pacientesRef.add({ ...pacientes }); 
  }
}
