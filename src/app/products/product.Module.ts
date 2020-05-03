import { GeneratedId } from 'src/app/generatedId';

export class Product extends GeneratedId{
     id: string;
     product: string;
     description: string;
     qte: number;
     price: number;
     tax: number;
     total: number;
}