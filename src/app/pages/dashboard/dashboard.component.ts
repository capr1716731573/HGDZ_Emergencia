import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {
  closeResult = '';
  modalsNumber = 0;
  options: NgbModalOptions = {
	backdropClass: '.app-session-modal-backdrop',
	windowClass: '.app-session-modal-window'
  };
  constructor(private modalService: NgbModal) {
	this.modalService.activeInstances.subscribe((list) => {
		this.modalsNumber = list.length;
	});
  }
  
  ngOnInit(): void {
    
  }

  open(content:any) {
	this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
		(result) => {
			this.closeResult = `Closed with: ${result}`;
		},
		(reason) => {
			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		},
	);
}

private getDismissReason(reason: any): string {
	if (reason === ModalDismissReasons.ESC) {
		return 'by pressing ESC';
	} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
		return 'by clicking on a backdrop';
	} else {
		return `with: ${reason}`;
	}
}
}
