import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon } from 'antd';

export class SideMenu extends React.Component {
    onSelectChange(selectEvent) {
        this.props.menuSelectedChange(selectEvent.key);
    }

    render() {
        return (
            <Layout.Sider style={{ background: '#fff' }}>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={this.props.selectKey} style={{ height: '100%', borderRight: 0 }} onSelect={this.onSelectChange.bind(this)}>
                    <Menu.Item key="publish">
                        <Icon type="global" />
                        <span>发布版本</span>
                    </Menu.Item>
                    <Menu.Item key="mission_list">
                        <Icon type="unordered-list" />
                        <span>编译任务列表</span>
                    </Menu.Item>
                    <Menu.SubMenu
                        key="sub_newmission"
                        title={<span><Icon type="plus-circle" /><span>新建编译任务</span></span>}>
                        <Menu.Item key="new_sep">新建SEP</Menu.Item>
                        <Menu.Item key="new_weixun">新建WeixunClient</Menu.Item>
                        <Menu.Item key="new_solution">新建整合包</Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            </Layout.Sider>
        )
    }
}