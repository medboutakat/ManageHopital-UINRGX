import { City } from '../city'
import { Action } from '@ngrx/store'
export enum CitiesActionTypes {
    LOAD_CITIES = "[city] Load Cities",
    LOAD_CITIES_SUCCESS = "[city] Load  Cities Success",
    LOAD_CITIES_FAILED = "[city] Load  Cities Failed",

}
export class LoadCities implements Action {
    readonly type = CitiesActionTypes.LOAD_CITIES
    constructor() { }
}
export class LoadCitiesSuccess implements Action {
    readonly type = CitiesActionTypes.LOAD_CITIES_SUCCESS
    constructor(public playload: City[]) {
    }
}
export class LoadCitiesFailed implements Action {
    readonly type = CitiesActionTypes.LOAD_CITIES_FAILED
    constructor(public playload: string) { }
}


export type Action =
    LoadCities
    | LoadCitiesSuccess
    | LoadCitiesFailed
