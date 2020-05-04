import { GeneratedId } from 'src/app/generatedId';

export class Product extends GeneratedId{
     id: string;
     name: string;
     quantityPerUnit: string;
     unitPrice: string;
     unitsInStock: number;
     unitsOnOrder: number;
     reorderLevel: number;
     discontinued: number; 
     productCategoryId:string;
}