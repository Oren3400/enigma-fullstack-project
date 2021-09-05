import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from './screens';
import { Provider } from 'react-redux';

import { store } from '../store';

function App() {
    return (
        <Router>
            <Provider store={store}>
                <Routes />
            </Provider>
        </Router>
    );
}

export default App;
