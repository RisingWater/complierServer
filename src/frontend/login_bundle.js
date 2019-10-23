import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Form, Icon, Input, Button, Alert, PageHeader } from 'antd';
import { HeaderBar } from './component/headerbar.js'
import $ from 'jquery';

function setCookie(name, value)
{
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

class LoginFormTemplate extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                
                var json = { "username": values.username, "password": values.password };
                console.log(json);

                var userid = null;
                $.ajax({
                    type: "post",
                    url: "user/login",
                    contentType: "application/json",
                    async: false,
                    data: JSON.stringify(json),
                    success: function (data, status) {
                        if (data.result == 0) {
                            console.log("ajax ok");
                            userid = data.userid;
                        } else {
                            console.log("ajax failed");
                        }
                    }
                })

                if (userid == null) {
                    this.props.showError(true);
                    return;
                }
                
                setCookie("userid", userid);
                window.location.href = "./complierServer.html";
            }
        });
    };

    guestLogin() {
        setCookie("userid", "guest");
        window.location.href = "./complierServer.html";
    }
  
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {rules: [{ required: true, message: '请输入用户名!' }]})(
                        <Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名"/>,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {rules: [{ required: true, message: '请输入密码!' }]})(
                        <Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码"/>,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                    <div style={{ height : 8 }}/>
                    <Button className="login-form-button" onClick={() => { 
                        this.guestLogin();
                    }}>访客登录</Button>
                    或者 <a href="">注册新用户</a>
                </Form.Item>
                
            </Form>
        );
    }
}

class RootContext extends React.Component {
    constructor(props,context) {
        super(props,context)
        this.state = {
            showError : false
        }
    }

    showError(on) {
        this.setState( {showError : on});
    }

    getAlert() {
        if (this.state.showError) {
            return (<div style={{marginBottom : 20}}><Alert message="登陆失败，请检查用户名和密码" type="error" showIcon closable/></div>);
        }
        else
        {
            return (<div/>);
        }
    }

    render() {
        var height = $(window).height() - 64;
        const LoginForm = Form.create({ name: 'normal_login' })(LoginFormTemplate);
        return (
            <Layout>
                <HeaderBar title="编译服务平台" userlogin={false}/>
                <Layout>
                    <Layout.Content style={{background: '#fff', paddingLeft: 24, paddingRight: 24, margin: 0, minHeight: height,}}>
                        <div className="login-form centerblock2">
                            <PageHeader title="登录"/>
                            {this.getAlert()}
                            <LoginForm/>
                        </div>
                    </Layout.Content>
                </Layout>
            </Layout>
        );
    }
}

ReactDOM.render(
    <RootContext/>,
    document.getElementById("root")
);