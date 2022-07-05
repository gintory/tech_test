import { Menu, Input, Button, Dropdown } from 'antd';
import React, { useEffect, useState, useRef, useContext } from 'react';
import Attr from '../components/attr';
import { EventContext } from '../pages/testurl';

export default function Event(props) {
  const eventIndex = props.index;
  const { events, setEvents } = useContext(EventContext);
  const event = useRef();
  useEffect(() => {
    renderAttrs();
  }, [events[eventIndex].attrs]);
  function handleInput(event) {
    events[eventIndex][event.target.name] = event.target.value;
    setEvents([...events]);
  }

  function addAttr() {
    events[eventIndex].attrs.push({ attrName: '' });
    setEvents([...events]);
  }
  function renderAttrs() {
    if (events[eventIndex].attrs.length)
      return events[eventIndex].attrs.map((item, index) => <Attr key={index} eIndex={eventIndex} index={index}></Attr>);
  }
  return (
    <div ref={event} style={{ padding: '30px', border: '1px solid pink' }}>
      <Input name="title" onChange={handleInput} value={events[eventIndex].title}></Input>
      <Button onClick={addAttr}>add attribution</Button>
      <div className="attrs">{renderAttrs()}</div>
    </div>
  );
}
