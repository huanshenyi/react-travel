import { Middleware } from 'redux';

export const actionLog = (store) => (next) => (action) => {
    console.log("state ", store.getState());
    console.log("fire action ", action);
    next(action)
    console.log("state 更新", store.getState())
}
