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
  const [{data: todos, loading, error: errorLoading}, loadTodos] = useAxios('/todos');
  const [{loading: saving, error: errorSaving}, saveTodo] = useAxios({url: '/todos', method: 'post'}, {manual: true});
  const [{loading: deleting, error: errorDeleting}, deleteTodo] = useAxios({method: 'delete'}, {manual: true});
  const [{loading: updating, error: errorUpdating}, updateTodo] = useAxios({method: 'patch'}, {manual: true});

  const handleTodoAdded = useCallback(todo => saveTodo({data: todo}).then(() => loadTodos()));
  const handleTodoRemoved = useCallback(id => deleteTodo({url: `/todos/${id}`}).then(() => loadTodos()));
  const handleTodoUpdated = useCallback(({id, notes, due, done}) => updateTodo({
    url: `/todos/${id}`,
    data: {notes, due, done}
  }).then(() => loadTodos()));

  return <App 
    todos={todos}
    spinner={loading || saving || deleting}
    error={errorLoading || errorSaving || errorDeleting}
    onTodoAdded={handleTodoAdded}
    onTodoRemoved={handleTodoRemoved}
    onTodoUpdated={handleTodoUpdated}/>;
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
