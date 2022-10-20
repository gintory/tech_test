import { Menu, Dropdown } from 'antd';
import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import './index.css';

export default function home(props) {
  const navigate = useNavigate();
  const menu1 = [
    {
      label: 'echarts',
      key: 'echarts',
      url: 'echarts',
      onClick: () => {
        navigate('/echarts');
      }
    },
    {
      label: 'antv',
      key: 'antv',
      url: 'antv',
      onClick: () => {
        navigate('/antv');
      }
    },
    {
      label: 'testurl',
      key: 'testurl',
      url: 'testurl',
      onClick: () => {
        navigate('/testurl');
      }
    },
    {
      label: 'socket',
      key: 'socket',
      url: 'socket',
      onClick: () => {
        navigate('/socket');
      }
    }
  ];

  const menu = [
    {
      label: 'js',
      key: 'js',
      url: 'js',
      children: [
        {
          label: 'promise',
          key: 'promise',
          url: 'promise',
          onClick: () => {
            navigate('/promise');
          }
        }
      ]
    }
  ];

  // function renderMenu() {
  //   if (menu) {
  //     return menu.map((item) => (
  //       <Menu.Item className="submenu" key={item.key}>
  //         <NavLink to={item.url}>
  //           <span>{item.title}</span>
  //         </NavLink>
  //       </Menu.Item>
  //     ));
  //   } else {
  //     navigate('/');
  //   }
  // }

  return (
    <div className="main">
      <Menu mode="inline" items={menu} style={{ width: '20%', height: '100vh' }}></Menu>
      <Outlet />
    </div>
  );
}
