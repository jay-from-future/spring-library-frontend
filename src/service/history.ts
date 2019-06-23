import {createBrowserHistory, History} from 'history';

const history = createBrowserHistory();

export function getHistory():History {
    return history;
}