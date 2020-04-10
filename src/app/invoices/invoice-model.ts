
export interface Invoice {
  id: string;
  code: string;
  date: Date;
  totalAmont: number;
  expedition: number;
  livraison: number;
  remise: number;
  invoiceDetails: InvoiceDetail[];
}

export interface InvoiceDetail {
    id: string;
    product: string;
    description: string;
    qte: number;
    price: number;
    tax: number;
    total: number;
}
  