import moment from 'moment';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import {Fragment, useEffect, useRef, useCallback, useState} from 'react';
import {Trash, Pencil, Calendar as CalendarIcon, CardList} from 'react-bootstrap-icons';

import './App.css';

function TodoForm({onSubmit = todo => {}, submitText = 'Do it', todo = {}}) {
  const notesRef = useRef();
  const dueRef = useRef();

  const handleSubmit = useCallback(e => {
    e.preventDefault();

    if (moment(e.currentTarget.elements.due.value).isBefore()) {
      e.currentTarget.elements.due.setCustomValidity('date must be in the future, dumby');
    } else {
      onSubmit({
        id: todo.id,
        notes: e.currentTarget.elements.notes.value,
        due: moment(e.currentTarget.elements.due.value).unix()
      }).then(() => {
        notesRef.current?.focus();
        notesRef.current && (notesRef.current.value = '');
        dueRef.current && (dueRef.current.value = '');
      });
    }
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
            onKeyDown={e => e.currentTarget.setCustomValidity('')}
            defaultValue={todo.due && moment.unix(todo.due).format('YYYY-MM-DD')}
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
            <small className="">{moment.unix(due).format('ll')}</small>
            <Button variant="link" onClick={() => onRemoved(id)}><Trash/></Button>
          </Fragment>
        )}
      </div>
    </ListGroup.Item>
  );
}

const localizer = momentLocalizer(moment);

function App({onAdded = todo => {}, onUpdated = todo => {}, onRemoved = id => {}, todos = [], loading = false}) {
  const [calendared, setCalendared] = useState(false);
  const [activeFilter, setActiveFilter] = useState('');

  const filter = <Form.Control 
    size="sm"
    type="text"
    value={activeFilter}
    onChange={e => setActiveFilter(e.currentTarget.value)}
    placeholder="filter todos"
    className="ms-2"
    name="filter" />;

  return calendared ? (
    <Fragment>
      <div className="d-flex pb-2">
        <Button onClick={e => setCalendared(false)} size="sm" variant="primary"><CardList/></Button>
        {filter}
      </div>
      <Calendar
        style={{height: 500}}
        events={Object.values(todos).filter(({notes}) => notes.includes(activeFilter)).map(({due, notes: title}) => ({
          title, 
          start: moment.unix(due).toDate(), 
          end: moment.unix(due).toDate(),
          allDay: true
        }))}
        localizer={localizer}
      />
    </Fragment>
  ) : (
    <Fragment>
      <div className="d-flex pb-2">
        <Button onClick={e => setCalendared(true)} size="sm" variant="primary"><CalendarIcon/></Button>
        {filter}
      </div>
      <ListGroup style={{width: '100%'}}>
        <ListGroup.Item>
          <TodoForm onSubmit={onAdded}/>
        </ListGroup.Item>
        {Object.entries(todos).filter(([id, {notes}]) => notes.includes(activeFilter)).map(([id, todo]) => (
          <TodoListGroupItem key={id} onRemoved={onRemoved} onUpdated={onUpdated} {...{id, ...todo}}/>
        ))}
      </ListGroup>
    </Fragment>
  );
}

export default App;
