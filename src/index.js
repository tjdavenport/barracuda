import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/scss/bootstrap.scss';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <div className="container-fluid">
      <Row style={{height: '100vh'}} className="d-flex align-items-center justify-content-center">
        <Col xl={8} md={10} sm={12}>
          <App />
        </Col>
      </Row>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
