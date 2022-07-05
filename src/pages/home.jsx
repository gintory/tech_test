import { Menu, Dropdown } from 'antd';
import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
export default function home(props) {
  const navigate = useNavigate();
  const menu = [
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

  function renderMenu() {
    if (menu) {
      return menu.map((item) => (
        <Menu.Item className="submenu" key={item.key}>
          <NavLink to={item.url}>
            <span>{item.title}</span>
          </NavLink>
        </Menu.Item>
      ));
    } else {
      navigate('/');
    }
  }

  return (
    <div>
      <Menu mode="horizontal" items={menu}></Menu>
      <Outlet />
    </div>
  );
}
