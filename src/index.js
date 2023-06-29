import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DisplayPage from './views/displayPage/DisplayPage';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path='404' exact render={() => <div>404 || Page Not Found</div>} />
        <Route path='401' exact render={() => <div>401 || Page Not Found</div>} />
        <Route path='500' exact render={() => <div>500 || Internal Server Error</div>} />
        <Route path='/sc/:path_name' render={() => <DisplayPage />} />
        <Route path='/' component={App} />
      </Switch>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
