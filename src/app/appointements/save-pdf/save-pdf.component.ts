import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import * as jspdf from 'jspdf'

@Component({
  selector: 'app-save-pdf',
  templateUrl: './save-pdf.component.html',
  styleUrls: ['./save-pdf.component.scss']
})

export class SavePdfComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log("objet 2", data)
  }
  nb = 1;
  download() {
    var data = document.getElementById("content");
    const doc = new jspdf();
    doc.fromHTML(data.innerHTML, 15, 15);
    doc.save("convocation n°" + this.nb + '.pdf');
    this.nb = this.nb + 1;
  }
  ngOnInit() {
  }


}
