import { ModalViewComponent } from '../../shared/modal-view/modal-view.component';
import { StateService } from '../../services/state.service';
import { Component, OnInit } from '@angular/core';
import { IOrderResponse, IOrderDataTable } from '../../interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

const TableKeyMap = [
  {
    name: 'orderId',
    title: 'Order ID',
    isMandatoryDisplayField: true
  }, {
    name: 'startDate',
    title: 'Start Date',
    isMandatoryDisplayField: true
  }, {
    name: 'endDate',
    title: 'End Date',
    isMandatoryDisplayField: true
  }, {
    name: 'customerName',
    title:'Customer Name',
    isMandatoryDisplayField: false
  }, {
    name: 'orderType',
    title: 'Order Type',
    isMandatoryDisplayField: false
  }, {
    name: 'phoneNumber',
    title: 'Phone Number',
    isMandatoryDisplayField: false
  }, {
    name: 'orderSum',
    title: 'Order Sum',
    isMandatoryDisplayField: true
  }
]

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss']
})
export class ReportTableComponent implements OnInit {
  
  constructor(private state: StateService, private modalService: NgbModal) { }
  ordersTableData: IOrderDataTable[] = [];
  tableKeyMap = [];
  
  ngOnInit() {
    this.tableKeyMap = TableKeyMap;
    this.state.ordersSub$.subscribe((ordersData: IOrderResponse[]) => {
      if (ordersData.length > 0) this.initializeTable(ordersData);
    });
    this.state.getCurrentPosData();
  }
  
  initializeTable(orders: IOrderResponse[]): void {
    orders.forEach((order, index) => {
      this.ordersTableData[index] = {
        orderId: order.ID,
        startDate: order.EndTimeString,
        endDate: order.EndTimeString,
        customerName: order.CustomerName,
        orderType: order.PaymentMethodDisplayName,
        phoneNumber: order.CustomerPhoneNumber,
        orderSum: order.OrderSumString
      }
    });
  }

  openOrderSingleView(order: IOrderDataTable) {
    const modalRef = this.modalService.open(ModalViewComponent);
    modalRef.componentInstance.dataToDisplay = order;
    modalRef.componentInstance.title = 'Order Details';
  }

  openPosDetails() {
    const modalRef = this.modalService.open(ModalViewComponent);
    modalRef.componentInstance.dataToDisplay = this.state.getCurrentPosData();
    modalRef.componentInstance.title = 'POS Details';
  }
  
}
