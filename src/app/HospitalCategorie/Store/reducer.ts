import * as ActionsFile from "src/app/HospitalCategorie/Store/Action";
import * as fromRoot from "src/app/HospitalCategorie/Store/State/app-state";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { HospitalCat } from "../hospitalCat.model";
import { EntityAdapter, createEntityAdapter, EntityState } from "@ngrx/entity";

export interface HospitalCatState extends EntityState<HospitalCat> {
  selectById: string | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  HospitalCats: HospitalCatState;
}

export const HospitalCatAdapter: EntityAdapter<HospitalCat> = createEntityAdapter<
  HospitalCat
>();
export const DefaulttHospitalCat: HospitalCatState = {
  ids: [],
  entities: {},
  selectById: null,
  loading: false,
  loaded: false,
  error: " ",
};
export const initialState = HospitalCatAdapter.getInitialState(
  DefaulttHospitalCat
);

export function HospitalCatReducer(
  state = initialState,
  action: ActionsFile.HospitalCatAction
): HospitalCatState {
  switch (action.type) {
    case ActionsFile.HospitalCatActionType.LOAD_SUCCESS: {
      return HospitalCatAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true,
      });
    }
    case ActionsFile.HospitalCatActionType.LOAD_FAIL: {
      return {
        ...state,
        loading: false,
        entities: {},
        loaded: false,
        error: action.payload,
      };
    }
    case ActionsFile.HospitalCatActionType.CREATE_SUCCESS: {
      return HospitalCatAdapter.addOne(action.payload, state);
    }
    case ActionsFile.HospitalCatActionType.CREATE_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case ActionsFile.HospitalCatActionType.UPDATE_SUCCESS: { 
      const changes = action.payload;
      const id = changes.id;
      console.log("updateOne:hello: ", changes)
      return HospitalCatAdapter.updateOne({ id,changes } , state);
    }
    case ActionsFile.HospitalCatActionType.UPDATE_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case ActionsFile.HospitalCatActionType.DELETE_SUCCESS: {
      return HospitalCatAdapter.removeOne(action.payload, state);
    }
    case ActionsFile.HospitalCatActionType.DELETE_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

const getHospitalCatsFeatursState = createFeatureSelector<HospitalCatState>(
  "HospitalCats"
);

export const getHospitalCats = createSelector(
  getHospitalCatsFeatursState,
  HospitalCatAdapter.getSelectors().selectAll
);
export const getHospitalCatsLoading = createSelector(
  getHospitalCatsFeatursState,
  (state: HospitalCatState) => state.loading
);
export const getHospitalCatsLoaded = createSelector(
  getHospitalCatsFeatursState,
  (state: HospitalCatState) => state.loaded
);
export const getHospitalCatsError = createSelector(
  getHospitalCatsFeatursState,
  (state: HospitalCatState) => state.error
);
export const getHospitalCatsbyid = createSelector(
  getHospitalCatsFeatursState,
  (state: HospitalCatState) => state.selectById
);
export const getcurrenthospital = createSelector(
  getHospitalCatsFeatursState,
  getHospitalCatsbyid,
  (state) => state.entities[state.selectById]
);
