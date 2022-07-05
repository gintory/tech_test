import React, { useEffect, useState, useRef, createContext, useContext } from 'react';
import { request } from '../network/request';
import { Button, Input } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { keyboard } from '@testing-library/user-event/dist/keyboard';
import Event from '../components/event';
import io from 'socket.io-client';
export const EventContext = createContext();
const socket = io();
export default function Testurl(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const [dataSource, setDataSource] = useState({});
  const [filterUser, setFilterUser] = useState({
    id: 0,
    userName: ''
  });
  const [events, setEvents] = useState([{ title: 'e1', attrs: [{ attrName: '1a1' }, { attrName: '1a2' }] }]);

  useEffect(() => {
    getDataSource();
  }, [location]);
  useEffect(() => {
    renderEvents();
  }, [events]);

  const eventBox = useRef();

  function handleNameClick() {
    let url = `/testurl/?`;
    for (let key in filterUser) {
      url += `${key}=${filterUser[key]}&&`;
    }
    url = url.substring(0, url.length - 2);
    navigate(url);
  }

  function handleInput(event) {
    setFilterUser({ ...filterUser, [event.target.name]: event.target.value });
  }

  function getDataSource() {
    let data = {};
    if (location.search.length) {
      let options = location.search.substring(1);
      options = options.split('&&');
      options.forEach((item) => {
        item = item.split('=');
        data[item[0]] = item[1];
      });
      request({
        url: '/api/getData',
        method: 'post',
        data: data
      }).then((res) => {
        setDataSource(res.data.data);
      });
    }
  }
  function addEvent() {
    let arr = [...events];
    arr.push({ title: '', attrs: [] });
    setEvents([...arr]);
  }

  function renderEvents() {
    if (events.length) return events.map((item, index) => <Event key={index} index={index} data={item}></Event>);
  }

  function handleSubmit() {
    console.log(events);
  }

  return (
    <div style={{ paddingLeft: '20%' }}>
      <Input name="userName" value={filterUser.userName} onChange={handleInput} style={{ width: 300 }}></Input>
      <Button onClick={handleNameClick}>search</Button>
      <div>name: {dataSource.userName}</div>
      <div>password: {dataSource.password}</div>
      <Button onClick={addEvent}>add event</Button>
      <div className="eventBox" ref={eventBox} style={{ border: '1px solid #fff' }}>
        <EventContext.Provider value={{ events, setEvents }}>{renderEvents()}</EventContext.Provider>
      </div>
      <Button onClick={handleSubmit}>submit</Button>
    </div>
  );
}
