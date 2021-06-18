export const SYNC_STATE = 'SYNC_STATE';

export const syncGameState = (state) => ({
    type: SYNC_STATE,
    payload: state
});
