import {IAppState} from 'src/app/customerCategorie/Store/app-state';
import {createSelector} from '@ngrx/store'; 

import { customerCat } from '../customerCat.module';

const _selectAll = (state: IAppState<customerCat>) => state.all; 

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