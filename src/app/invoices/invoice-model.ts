import { GeneratedId } from '../generatedId';

export class Invoice extends GeneratedId { 
  code: string;
  date: Date;
  totalAmont: number;
  expedition: number;
  livraison: number;
  remise: number;
  invoiceDetails: InvoiceDetail[];
  customer?:string;
  /**
   *
   */
  constructor() {
    super();
    this.invoiceDetails=[];
    this.date=new Date();
  }
  newEmptyRow():InvoiceDetail{
    var detail=new InvoiceDetail();
    detail.description='';
    detail.product='';
    detail.price=0;
    detail.qte=0;
    detail.tax=0;
    detail.total=0;
    return detail;
  }
  firstEmptyRow():void{      
    this.invoiceDetails.push( this.newEmptyRow()); 
  }
}

export class InvoiceDetail {
    id: string;
    product: string;
    description: string;
    qte: number;
    price: number;
    tax: number;
    total: number;
}
  