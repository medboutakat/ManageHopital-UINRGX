
import { Store, Action } from '@ngrx/store'
import { Hospital } from '../hospital.model';
import { Update } from '@ngrx/entity';

 
export enum HospitalActionType {
    LOAD_Hospital = "[Hospital] load Hospital",
    LOAD_Hospital_SUCCESS = "[Hospital] LOAD Hospital Success",
    LOAD_Hospital_FAIL = "[Hospital] Load Hospital Fail ",
    AddAll = "AddAll",

     
    CREATE_Hospital = "[Hospital] Create Hospital",
    CREATE_Hospital_SUCCESS = "[Hospital] Create Hospital Success",
    CREATE_Hospital_FAIL = "[Hospital] Create Hospital Fail ",

    UPDATE_Hospital = "[Hospital] Update Hospital",
    UPDATE_Hospital_SUCCESS = "[Hospital] Update Hospital Success",
    UPDATE_Hospital_FAIL = "[Hospital] Update Hospital Fail ",

    DELETE_Hospital = "[Hospital] Delete Hospital",
    DELETE_Hospital_SUCCESS = "[Hospital] Delete Hospital Success",
    DELETE_Hospital_FAIL = "[Hospital] Delete Hospital Fail ",

}

export class LoadHospital implements Action{
    readonly type = HospitalActionType.LOAD_Hospital
}
export class LoadHospitalSuccess implements Action{
    readonly type = HospitalActionType.LOAD_Hospital_SUCCESS;

 constructor(public payload: Hospital[]){ }

}
export class LoadHospitalFail implements Action{
    readonly type = HospitalActionType.LOAD_Hospital_FAIL
    constructor(public payload: string){}
}


// Add HospitalCategory

export class CreateHospital implements Action{
    readonly type = HospitalActionType.CREATE_Hospital;
 constructor(public payload: Hospital){}

}
export class CreateHospitalSuccess implements Action{
    readonly type = HospitalActionType.CREATE_Hospital_SUCCESS;

 constructor(public payload: Hospital){}

}
export class CreateHospitalFail implements Action{
    readonly type = HospitalActionType.CREATE_Hospital_FAIL
    constructor(public payload: string){}
}

//Update hospitalCategory

export class UpdateHospital implements Action{
    readonly type = HospitalActionType.UPDATE_Hospital;
 constructor(public payload: Hospital){}

}
export class UpdateHospitalSuccess implements Action{
    readonly type = HospitalActionType.UPDATE_Hospital_SUCCESS;

 constructor(public payload: Update<Hospital>){}

}
export class UpdateHospitalFail implements Action{
    readonly type = HospitalActionType.UPDATE_Hospital_FAIL
    constructor(public payload: string){}
}

// delete HospitalCategory

export class DeleteHospital implements Action{
    readonly type = HospitalActionType.DELETE_Hospital;
 constructor(public payload: string){}

}
export class DeleteHospitalSuccess implements Action{
    readonly type = HospitalActionType.DELETE_Hospital_SUCCESS;
}

export class DeleteHospitalFail implements Action{
    readonly type = HospitalActionType.DELETE_Hospital_FAIL
    constructor(public payload: string){}
}

export type HospitalAction=
// LoadHospitalCat
 LoadHospital |
 LoadHospitalSuccess | 
 LoadHospitalFail
// CreateHospitalCat
 |CreateHospital
 | CreateHospitalSuccess
 |CreateHospitalFail
//  UpdateHospitalCat
 |UpdateHospital
 |UpdateHospitalSuccess
 |UpdateHospitalFail
 // DeleteHospitalCat
 |DeleteHospital
 |DeleteHospitalSuccess
 |DeleteHospitalFail;