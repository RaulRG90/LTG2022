import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  heading: string | null = null;
  content: any = null;
  constructor(public modalRef: MDBModalRef) {}
  ngOnInit(): void {
  }

}
