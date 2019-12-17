import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import App from './app';

import '../css/index.scss';
import '../css/colors/index.css';
import '../css/menu/menu.css';
import '../css/modal/plateModal.scss';

import mainReducer from './store/reducers/main';
import notificationsReducer from './store/reducers/notifications';
import singleUserReducer from './store/reducers/singleUser';
import usersListReducer from './store/reducers/usersList';
import reservationReducer from './store/reducers/reservations';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    notifications: notificationsReducer,
    main: mainReducer,
    singleUser: singleUserReducer,
    usersList: usersListReducer,
    reservation: reservationReducer
})

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
    )
)



const app = (
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
