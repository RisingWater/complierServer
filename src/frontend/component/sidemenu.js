import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon } from 'antd';

export class SideMenu extends React.Component {
    onSelectChange(selectEvent) {
        var path = new Array();
        path = this.getKey(this.props.dataSource, selectEvent.key, path);
        console.log(path);
        this.props.menuSelectedChange(selectEvent.key, path, path[path.length - 1]);
    }

    getKey(array, key, path) {
        var foundkey = path;
        array.some((element) => {
            if (element.key == key) {
                foundkey.unshift(element.name);
                console.log(foundkey);
                return true;
            } else if (element.children.length > 0) {
                foundkey = this.getKey(element.children, key, foundkey);
                if (foundkey.length != 0) {
                    foundkey.unshift(element.name);
                    return true;
                }
            }
        })

        return foundkey;
    }

    getMenus (dataSource) {
        return (
            dataSource.map ((element) => {
                if (element.children.length == 0) {
                    return (
                        <Menu.Item key={element.key}>
                            {element.icon != "" ? <Icon type={element.icon} /> : <div/>}
                            {element.name}
                        </Menu.Item>
                    );
                } else {
                    return (
                        <Menu.SubMenu key={element.key}
                            title={
                                <span>
                                    {element.icon != "" ? <Icon type={element.icon} /> : <div/>}
                                    <span>
                                        {element.name}
                                    </span>
                                </span>
                            }
                        >
                            {this.getMenus(element.children)}
                        </Menu.SubMenu>
                    )
                }
            })
        )
    }

    render() {
        return (
            <Layout.Sider style={{ background: '#fff' }}>
                <Menu 
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={this.props.selectKey}
                    style={{ height: '100%', borderRight: 0 }}
                    onSelect={this.onSelectChange.bind(this)}>
                        {
                            this.getMenus(this.props.dataSource)
                        }
                </Menu>
            </Layout.Sider>
        )
    }
}