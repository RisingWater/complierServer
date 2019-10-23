import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Button, Tooltip } from 'antd';

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
                    <Tooltip placement="bottom" title="注销用户">
                        <Button style={{ float: "right", marginTop:16, marginLeft:20 }} ghost={true} icon="logout" onClick={()=> {
                            clearCookie();
                            window.location.href = "./Signin.html";
                        }}/>
                    </Tooltip>

                    {this.props.guest ? "<div/>" :
                        <Tooltip placement="bottom" title="修改密码">
                            <Button style={{ float: "right", marginTop:16, marginLeft:20 }} ghost={true} icon="lock" onClick={()=> {
                                window.location.href = "./Signin.html";
                            }}/>
                        </Tooltip>
                    }
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
                <HeaderBarRightComponent userlogin={ this.props.userlogin } guest={ this.props.guest }/>
            </Layout.Header>
        )
    }
}