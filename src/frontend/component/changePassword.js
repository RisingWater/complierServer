import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Icon, Input, Button } from 'antd';
import $ from 'jquery';

function getCookie(name)
{
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
}

export class ChangePasswordFormTemplate extends React.Component {
    constructor(props,context) {
        super(props,context)
        this.state = {
            confirmDirty: false,
            userid : ""
        };
    }

    componentWillMount() {
        var userid = getCookie("userid");
        this.setState({userid : userid});
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                
                var json = { "userid": this.state.userid, "password": values.password, "password_new": values.password_new };
                console.log(json);

                var change = false;
                $.ajax({
                    type: "post",
                    url: "user/changepassword",
                    contentType: "application/json",
                    async: false,
                    data: JSON.stringify(json),
                    success: function (data, status) {
                        if (data.result == 0) {
                            console.log("changepassword ajax ok");
                            change = true;
                        } else {
                            console.log("changepassword ajax failed " + data.result);
                        }
                    }
                })

                if (change == false) {
                    this.props.showError(true);
                    return;
                }
                
                window.location.href = "./complierServer.html";
            }
        });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password_new')) {
            callback('两次输入的密码不匹配!');
        } else {
            callback();
        }
    };
    
    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm_new'], { force: true });
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
                <Form.Item label="请输入原密码" hasFeedback>
                    {getFieldDecorator('password', {rules: [{ required: true, message: '请输入原密码!' }]})(
                        <Input.Password size="large" 
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                            placeholder="请输入原密码"/>,
                    )}
                </Form.Item>
                <Form.Item label="请输入新密码" hasFeedback>
                    {getFieldDecorator('password_new', {rules: [{ required: true, message: '请输入新密码!' }, { validator: this.validateToNextPassword }]})(
                        <Input.Password size="large" 
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                            placeholder="请输入新密码"/>,
                    )}
                </Form.Item>
                <Form.Item label="请再次输入新密码" hasFeedback>
                    {getFieldDecorator('confirm_new', {rules: [{ required: true, message: '请再次输入新密码!' }, { validator: this.compareToFirstPassword }]})(
                        <Input.Password size="large" 
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                            placeholder="请再次输入新密码"
                            onBlur={this.handleConfirmBlur}/>,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button size="large" type="primary" htmlType="submit" className="login-form-button">修改</Button>
                </Form.Item>
            </Form>
        );
    }
}