import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit {

  typeSelected: string;
  load : boolean = false;

  constructor(private spinnerService: NgxSpinnerService) {
    this.typeSelected = 'ball-fussion';
  }

  ngOnInit()
  {
    this.spinnerService.show();

    setTimeout(() => {
      this.load = true;
      this.spinnerService.hide();
    }, 2000); // 2 seconds
  }

}
