import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import RootStore from './store/RootStore';
import {Provider} from 'mobx-react';

const rootStore = new RootStore();

ReactDOM.render(
    <Provider store={rootStore}>
        <React.Fragment>
            <App />
        </React.Fragment>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
