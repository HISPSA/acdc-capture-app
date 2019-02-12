// @flow
import { batchActions } from 'redux-batched-actions';

export const batchActionTypes = {
    UPDATE_FIELD_AND_RUN_SEARCH_GROUP_SEARCHES_BATCH: 'UpdateFieldAndRunSearchGroupSearchesBatch',
    FILTERED_SEARCH_ACTIONS_FOR_SEARCH_BATCH: 'FilteredSearchActionsForSearchBatch',
};

export const updateFieldAndRunSearchGroupSearchesBatch =
    (innerAction: ReduxAction<any, any>, filterActions: Array<ReduxAction<any, any>>, filterActionsToBeExecuted: Array<ReduxAction<any, any>>) =>
        batchActions([innerAction, ...filterActions, ...filterActionsToBeExecuted], batchActionTypes.UPDATE_FIELD_AND_RUN_SEARCH_GROUP_SEARCHES_BATCH);

export const filteredSearchActionsForSearchBatch =
    (searchActions: Array<ReduxAction<any, any>>) =>
        batchActions(searchActions, batchActionTypes.FILTERED_SEARCH_ACTIONS_FOR_SEARCH_BATCH);
