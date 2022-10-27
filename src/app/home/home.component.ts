import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { MDBModalRef, MDBModalService } from 'ng-uikit-pro-standard';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  modalRef: MDBModalRef | null = null;
  constructor(private modalService: MDBModalService) { }

  ngOnInit(): void {
  }

  modalOptions = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: false,
    ignoreBackdropClick: false,
    class: 'modal-lg',
    containerClass: '',
    animated: true,
    data: {
      heading: 'Modal heading',
      content: { heading: 'Content heading', description: 'Content description'}
    }
  }



  openModal() {
    this.modalRef = this.modalService.show(ModalComponent, this.modalOptions)
  }
}
