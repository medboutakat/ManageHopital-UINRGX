import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { Invoice } from '../invoice-model';
import * as fromRoot from 'src/app/Invoices/store/app-state'
import * as ActionsFile from 'src/app/Invoices/store/Action'

export interface InvoiceState extends EntityState<Invoice> {
    invoices: Invoice[],
    selectedById: string | null,
    loading: boolean,
    loaded: boolean,
    error: string
}

export interface AppState extends fromRoot.AppState {
    Invoices: InvoiceState
}

export const InvoiceAdapter: EntityAdapter<Invoice> = createEntityAdapter<Invoice>();
export const DefaultState: InvoiceState = {
    ids: [],
    invoices: [],
    entities: {},
    selectedById: null,
    loading: false,
    loaded: false,
    error: ' ',
}
// export const initialState : HospitalCatState ={
//     HospitalCats :[],
//     loading: false,
//     loaded : false,
//     error : ' ',
// }
export const initialState = InvoiceAdapter.getInitialState(DefaultState)

export function InvoiceReducer(state = initialState, action: ActionsFile.InvoiceAction): InvoiceState {
    switch (action.type) {

        case ActionsFile.InvoiceActionType.LOAD_SUCCESS: {
            return InvoiceAdapter.addAll(action.payload, {
                ...state,
                loading: false,
                loaded: true,
                invoices: action.payload,

            });
        }

        case ActionsFile.InvoiceActionType.LOAD_FAIL: {
            return {
                ...state,
                loading: false,
                entities: {},
                loaded: false,
                error: action.payload
            }
        }
        default: {
            return state;
        }
    }

}


const getHospitalsFeatursState = createFeatureSelector<InvoiceState>(
    "Invoice"
)
export const getHospitalCats = createSelector(
    getHospitalsFeatursState,
    //    (state : HospitalCatState)=>state.HospitalCats
    InvoiceAdapter.getSelectors().selectAll
)
export const getHospitalCatsLoading = createSelector(
    getHospitalsFeatursState,
    (state: InvoiceState) => state.loading
)
export const getHospitalCatsLoaded = createSelector(
    getHospitalsFeatursState,
    (state: InvoiceState) => state.loaded
)
export const getHospitalCatsError = createSelector(
    getHospitalsFeatursState,
    (state: InvoiceState) => state.error
)
export const getHospitalCatsbyid = createSelector(
    getHospitalsFeatursState,
    (state: InvoiceState) => state.selectedById
);
export const getcurrenthospital = createSelector(
    getHospitalsFeatursState,
    getHospitalCatsbyid,
    state => state.entities[state.selectedById]
);
