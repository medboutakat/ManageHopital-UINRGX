import { GeneratedId } from 'src/app/generatedId';

export class Product extends GeneratedId{
     name: string;
     quantityPerUnit: number;
     unitPrice: number;
     unitsInStock: number;
     unitsOnOrder: number;
     reorderLevel: number;
     discontinued: boolean; 
     productCategoryId:string;
}