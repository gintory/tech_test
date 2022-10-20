import React, { useEffect, useState, useRef, useContext, useImperativeHandle } from 'react';
import io from 'socket.io-client';
import { Button, Input } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const socket = io('ws://localhost:3000');
export default function Socket(props) {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [dataSource, setDataSource] = useState({});
  const [filterUser, setFilterUser] = useState({
    id: 0,
    userName: ''
  });

  useEffect(() => {
    socket.on('sendUser', (res) => {
      setDataSource(res);
    });

    return () => {
      socket.off('connect');
      socket.off('sendUser');
    };
  }, []);

  useEffect(() => {
    getDataSource();
  }, [location]);

  function handleNameClick() {
    let url = `/socket/?`;
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
      socket.emit('getUser', data);
    }
  }

  return (
    <div style={{ paddingLeft: '20%' }}>
      <Input name="userName" value={filterUser.userName} onChange={handleInput} style={{ width: 300 }}></Input>
      <Button onClick={handleNameClick}>search</Button>
      <div>name: {dataSource.userName}</div>
      {/* <div>password: {dataSource.password}</div> */}
    </div>
  );
}
