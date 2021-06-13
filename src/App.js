import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import {Fragment, useEffect, useRef, useCallback} from 'react';

import './App.css';

function TodoForm({ onSubmit = todo => {} }) {
  const notesRef = useRef();
  const handleSubmit = useCallback(e => e.preventDefault() + onSubmit({
    notes: e.currentTarget.elements.notes.value,
    due: e.currentTarget.elements.due.value
  }), []);

  useEffect(() => notesRef.current?.focus(), []);

  // @TODO - possibly use a more intuitive date picker component
  return (
    <Fragment>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row}>
          <Col md={6}>
            <Form.Control required type="text" ref={notesRef} placeholder="get something done" name="notes" />
          </Col>
          <Col md={4}>
            <Form.Control required type="date" ref={notesRef} placeholder="get something done" name="due" />
          </Col>
          <Col md={2}>
            <Button style={{width: '100%'}} variant="primary" type="submit">Do It</Button>
          </Col>
        </Form.Group>
      </Form>
    </Fragment>
  );
}


function App({onTodoAdded = todo => {}, onTodoEdited = todo => {}, onTodoRemoved = id => {}, todos = [], loading = false}) {
  return (
    <ListGroup style={{width: '100%'}}>
      <ListGroup.Item>
        <TodoForm onSubmit={onTodoAdded}/>
      </ListGroup.Item>
      {Object.entries(todos).map(([id, {notes, due, done}]) => (
        <ListGroup.Item key={id}>
          <div className="d-flex">
            <Form.Check style={{flexGrow: 1}} checked={done} label={notes} inline name="done" type={'checkbox'}/>
            <small className="">Due on {due}</small>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default App;
