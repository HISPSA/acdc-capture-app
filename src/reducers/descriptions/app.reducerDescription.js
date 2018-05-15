// @flow
import { createReducerDescription } from 'capture-core/trackerRedux/trackerReducer';
import { actionTypes as entryActionTypes } from '../../init/entry.actions';

export const appReducerDesc = createReducerDescription({
    [entryActionTypes.STARTUP_DATA_LOADED]: (state, action) => {
        const newState = { ...state };
        newState.someRandomData = action.payload;
        newState.initDone = true;
        return newState;
    },
}, 'app');
