import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Button } from 'antd';

class HeaderBarRightComponent extends React.Component {
    render() {
        if (!this.props.userlogin) {
            return (
                <div/>
            )
        } else {
            return (
                <div>
                    <Button type="link">注销</Button>
                </div>
            )
        }
    }
}

export class HeaderBar extends React.Component {
    render() {
        return (
            <Layout.Header className="header">
                <div className="logo" />
                <span className="logo_title">{this.props.title}</span>
                <HeaderBarRightComponent userlogin={ this.props.userlogin }/>
            </Layout.Header>
        )
    }
}