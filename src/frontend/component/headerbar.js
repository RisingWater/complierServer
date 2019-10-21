import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Button } from 'antd';

function clearCookie() {            
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;) {
            document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString();
            document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString();
        }
    }
}

class HeaderBarRightComponent extends React.Component {
    render() {
        if (!this.props.userlogin) {
            return (
                <div/>
            )
        } else {
            return (
                <div style={{ height: 64}}>
                    <Button style={{ float: "right", marginTop:16 }} shape="round" icon="logout" onClick={()=> {
                        clearCookie();
                        window.location.href = "./Signin.html";
                    }}>注销</Button>
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