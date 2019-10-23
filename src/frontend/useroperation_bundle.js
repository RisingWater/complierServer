import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Form, Alert, PageHeader } from 'antd';
import { HeaderBar } from './component/headerbar.js'
import { LoginFormTemplate } from './component/loginform.js'
import { RegisterFormTemplate } from './component/registerform.js'
import $ from 'jquery';

function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }

    return(false);
}

const operationData = [
    {
        operation: "login",
        title: "登录",
        alert_msg: "登录失败，请检查用户名和密码",
    },
    {
        operation: "register",
        title: "注册",
        alert_msg: "注册失败, 此邮箱已经被人注册",
    }
]

class RootContext extends React.Component {
    constructor(props,context) {
        super(props,context)
        this.state = {
            showError : false,
            user : {
                result : -1,
                userid : "",
                username : "",
                isAdmin : false,
                subscribe: "",
            },
            operation : "",
            title: "",
            alert_msg: "",
        }
    }

    componentWillMount() {
        var operation = getQueryVariable("op");
        if (operation == false) {
            operation = "login";
        }

        this.setState({operation : operation});

        operationData.some((element) => {
            if (element.operation == operation) {
                this.setState({title : element.title, alert_msg : element.alert_msg});
            }
        })
    }

    showError(on) {
        this.setState( {showError : on});
    }

    getAlert() {
        if (this.state.showError) {
            return (<div style={{marginBottom : 20}}><Alert message={this.state.alert_msg} type="error" showIcon closable/></div>);
        }
        else
        {
            return (<div/>);
        }
    }

    getForm() {
        if (this.state.operation == "login") {
            const LoginForm = Form.create({ name: 'normal_login' })(LoginFormTemplate);
            return (
                <LoginForm showError={this.showError.bind(this)}/>
            )
        } else if (this.state.operation == "register") {
            const RegisterForm = Form.create({ name: 'normal_register' })(RegisterFormTemplate);
            return (
                <RegisterForm showError={this.showError.bind(this)}/>
            )
        } else {
            return (
                <div/>
            )
        }
    }

    render() {
        var height = $(window).height() - 64;

        return (
            <Layout>
                <HeaderBar title="编译服务平台" user={this.state.user}/>
                <Layout>
                    <Layout.Content style={{background: '#fff', paddingLeft: 24, paddingRight: 24, margin: 0, minHeight: height,}}>
                        <div className="login-form centerblock2">
                            <PageHeader title={this.state.title}/>
                            {this.getAlert()}
                            {this.getForm()}
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