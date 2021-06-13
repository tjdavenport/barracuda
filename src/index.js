import App from './App';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, {useCallback} from 'react';
import {makeUseAxios} from 'axios-hooks';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/scss/bootstrap.scss';
import './index.css';

const useAxios = makeUseAxios({
  axios: axios.create({baseURL: 'http://localhost:1337'})
});

function ApiWrapper() {
  const [{data: todos, loading, errorLoading}, loadTodos] = useAxios('/todos');
  const [{data, saving, errorSaving}, saveTodo] = useAxios({url: '/todos', method: 'post'}, {manual: true});

  const handleTodoAdded = useCallback(todo => {
    saveTodo({data: todo}).then(() => loadTodos());
  });

  return <App 
    todos={todos}
    spinner={loading || saving}
    error={errorLoading || errorSaving}
    onTodoAdded={handleTodoAdded} />;
}

ReactDOM.render(
  <React.StrictMode>
    <div className="container-fluid">
      <Row style={{height: '100vh'}} className="d-flex align-items-center justify-content-center">
        <Col xl={8} md={10} sm={12}>
          <ApiWrapper />
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
