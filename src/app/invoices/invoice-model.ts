import { GeneratedId } from '../generatedId';

export class Invoice extends GeneratedId { 
  code: string;
  date: Date;
  totalAmont: number;
  expedition: number;
  livraison: number;
  remise: number;
  invoiceDetails: InvoiceDetail[];   
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
  