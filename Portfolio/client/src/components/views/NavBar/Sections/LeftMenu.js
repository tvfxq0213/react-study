import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="Main">
      <a href="/">Home</a>
    </Menu.Item>
    <SubMenu title={<span>Portfolio</span>}>
      <MenuItemGroup title="회사프로젝트">
        <Menu.Item key="setting:1">Option 1</Menu.Item>
        <Menu.Item key="setting:2">Option 2</Menu.Item>
      </MenuItemGroup>
      <MenuItemGroup title="개인프로젝트">
        <Menu.Item key="setting:3">Option 3</Menu.Item>
        <Menu.Item key="setting:4">Option 4</Menu.Item>
      </MenuItemGroup>
    </SubMenu>
    <Menu.Item key="contact_me">
      <a href="/contact">Contact Me</a>
    </Menu.Item>
  </Menu>
  )
}

export default LeftMenu