import { Menu, Input, Button, Dropdown } from 'antd';
import React, { useEffect, useState, useRef, useContext, useImperativeHandle } from 'react';
import { EventContext } from '../pages/testurl';
export default function Event(props, ref) {
  const eventIndex = props.eIndex;
  const attrIndex = props.index;
  const { events, setEvents } = useContext(EventContext);
  function handleInput(event) {
    events[eventIndex].attrs[attrIndex][event.target.name] = event.target.value;
    setEvents([...events]);
  }

  return (
    <div>
      <Input name="attrName" onChange={handleInput} value={events[eventIndex].attrs[attrIndex].attrName}></Input>
      <div>{events[eventIndex].attrs[attrIndex].attrName}</div>
    </div>
  );
}
