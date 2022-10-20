import { Route, Routes, BrowserRouter } from 'react-router-dom';
import React from 'react';
import Home from '../pages/home';
import Echarts from '../pages/echarts';
import Antv from '../pages/antv';
import Testurl from '../pages/testurl';
import Socket from '../pages/socket';
import Promise from '../pages/promise-demo';

export default class RouteConfig extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/echarts" element={<Echarts />} />
            <Route path="/antv" element={<Antv />} />
            <Route path="/testurl" element={<Testurl />} />
            <Route path="/socket" element={<Socket />} />
            <Route path="/promise" element={<Promise />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}
