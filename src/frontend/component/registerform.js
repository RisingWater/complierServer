import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Icon, Input, Button } from 'antd';
import $ from 'jquery';

function setCookie(name, value)
{
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

export class RegisterFormTemplate extends React.Component {
    constructor(props,context) {
        super(props,context)
        this.state = {
            confirmDirty: false,
        };
    }

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
                    url: "user/register",
                    contentType: "application/json",
                    async: false,
                    data: JSON.stringify(json),
                    success: function (data, status) {
                        if (data.result == 0) {
                            console.log("register ajax ok");
                            userid = data.userid;
                        } else {
                            console.log("register ajax failed " + data.result);
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

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不匹配!');
        } else {
            callback();
        }
    };
    
    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };   
    
    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item label="请输入邮箱地址" hasFeedback>
                    {getFieldDecorator('username', {rules: [{ type: 'email', message: '请输入正确的邮箱地址' }, { required: true, message: '请输入邮箱地址' }]})(
                        <Input size="large" type="email" prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入邮箱地址"/>,
                    )}
                </Form.Item>
                <Form.Item label="请输入密码" hasFeedback>
                    {getFieldDecorator('password', {rules: [{ required: true, message: '请输入密码!' }, { validator: this.validateToNextPassword }]})(
                        <Input.Password size="large" 
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                            placeholder="请输入密码"/>,
                    )}
                </Form.Item>
                <Form.Item label="请再次输入密码" hasFeedback>
                    {getFieldDecorator('confirm', {rules: [{ required: true, message: '请输入密码!' }, { validator: this.compareToFirstPassword }]})(
                        <Input.Password size="large" 
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                            placeholder="请再次输入密码"
                            onBlur={this.handleConfirmBlur}/>,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button size="large" type="primary" htmlType="submit" className="login-form-button">注册</Button>
                </Form.Item>
            </Form>
        );
    }
}