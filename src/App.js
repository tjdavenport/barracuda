import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Fragment, useEffect, useRef} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

import './App.css';

function TodoForm({}) {
  const notesRef = useRef();

  useEffect(() => notesRef.current?.focus(), []);

  // @TODO - possibly use a more intuitive date component
  return (
    <Fragment>
      <Form>
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
        <Form.Group as={Col}>
        </Form.Group>
      </Form>
    </Fragment>
  );
}


function App() {
  return (
    <ListGroup style={{width: '100%'}}>
      <ListGroup.Item>
        <TodoForm />
      </ListGroup.Item>
    </ListGroup>
  );
}

export default App;
