import moment from 'moment';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import {Trash, Pencil} from 'react-bootstrap-icons';
import {Fragment, useEffect, useRef, useCallback, useState} from 'react';

import './App.css';

function TodoForm({onSubmit = todo => {}, submitText = 'Do it', todo = {}}) {
  const notesRef = useRef();
  const dueRef = useRef();
  const handleSubmit = useCallback(e => {
    e.preventDefault();
    onSubmit({
      id: todo.id,
      notes: e.currentTarget.elements.notes.value,
      due: new Date(e.currentTarget.elements.due.value).getTime()
    }).then(() => {
      notesRef.current?.focus();
      notesRef.current && (notesRef.current.value = '');
      dueRef.current && (dueRef.current.value = '');
    });
  }, [onSubmit]);

  useEffect(() => notesRef.current?.focus(), []);

  // @TODO - possibly use a more intuitive date picker component
  return (
    <Form onSubmit={handleSubmit} style={{width: '100%'}}>
      <Form.Group as={Row}>
        <Col md={6}>
          <Form.Control required type="text" ref={notesRef} defaultValue={todo.notes} placeholder="get something done" name="notes" />
        </Col>
        <Col md={4}>
          <Form.Control 
            required 
            type="date"
            ref={dueRef}
            defaultValue={todo.due && new Date(todo.due).toISOString().substr(0, 10)}
            placeholder="get something done" name="due" />
        </Col>
        <Col md={2}>
          <Button style={{width: '100%'}} variant="primary" type="submit">{submitText}</Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

function TodoListGroupItem({id, notes, due, done, onRemoved = id => {}, onUpdated = todo => {}}) {
  const [updating, setUpdating] = useState(false);

  return (
    <ListGroup.Item key={id}>
      <div className="d-flex align-items-center">
        {updating ? (
          <TodoForm todo={{id, notes, due}} onSubmit={todo => {
            setUpdating(false)
            return onUpdated(todo);
          }} submitText={'Save'}/>
        ) : (
          <Fragment>
            <Form.Check
              checked={done}
              label={notes}
              onClick={e => onUpdated({id, done: e.currentTarget.checked})}
              inline
              name="done"
              id={`checked-${id}`}
              type={'checkbox'}/>
            <div style={{flexGrow: 1}}>
              <Button  variant="link" onClick={e => setUpdating(true)}><Pencil/></Button>
            </div>
            <small className="">{new Date(due).toLocaleDateString()}</small>
            <Button variant="link" onClick={() => onRemoved(id)}><Trash/></Button>
          </Fragment>
        )}
      </div>
    </ListGroup.Item>
  );
}


function App({onAdded = todo => {}, onUpdated = todo => {}, onRemoved = id => {}, todos = [], loading = false}) {
  return (
    <ListGroup style={{width: '100%'}}>
      <ListGroup.Item>
        <TodoForm onSubmit={onAdded}/>
      </ListGroup.Item>
      {Object.entries(todos).map(([id, todo]) => (
        <TodoListGroupItem key={id} onRemoved={onRemoved} onUpdated={onUpdated} {...{id, ...todo}}/>
      ))}
    </ListGroup>
  );
}

export default App;
