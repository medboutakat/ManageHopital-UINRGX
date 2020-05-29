import { GeneratedId } from 'src/app/generatedId';

export class Tax extends GeneratedId{
 
    constructor() {
        super(); 
    }
    name: string;
    value: number;
}