import {IAppState} from 'src/app/customerCategorie/Store/app-state';
import {createSelector} from '@ngrx/store'; 

import {CustomerCat } from '../customer-cat.model';

const _selectAll = (state: IAppState<CustomerCat>) => state.all; 

export const selectAll = createSelector(_selectAll, (state) => state.all);
export const selectFilter = createSelector(_selectAll, (state,props) =>
{
  let id=0; 
   if(props.ids!=undefined)
      id=props.id;
   return  state.all.find(x=> x.id==id)
});

export const selectOne = createSelector(_selectAll, (state,props) =>
{
  let id=0;

   if(props.id!=undefined)
      id=props.id;
   return  state.all.find(x=> x.id==id)
});