import React from 'react';
import 'antd/dist/antd.css';
import { Divider, Typography, Input, Form, Button, Radio, Checkbox  } from 'antd';

export class WeixunClientComplierModuleFormTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            oem_enable : false,
            modules : [
                {
                    "value" : "0",
                    "name" : "Weixun协议服务端"
                },
                {
                    "value" : "1",
                    "name" : "Weixun协议客户端"
                },
            ],
        };
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmit(values);
            }
        });
    };

    getModuleDisabled(value) {
        var disabled = true;
        console.log(this.props.mission_complier_module);
        this.props.mission_complier_module.modules_enable.some((element) => {
            if (element == value) {
                disabled = false;
                return true;
            }
        })

        return disabled;
    }

    getModuleSelectComponent()
    {
        const { getFieldDecorator } = this.props.form;
        var enable = false;
        this.props.mission_complier_module.modules_enable.some((element) => {
            enable = true;
        })

        if (enable)
        {
            return (
                <Form.Item>
                {getFieldDecorator('modules', {rules: [{ required: true, message: '请选择编译模块' }]}) (
                    <Radio.Group>
                    {
                        this.state.modules.map((element) => {
                            return (<Radio value={element.value} disabled={this.getModuleDisabled(element.value)}>{element.name}</Radio>)
                        })
                    }
                    </Radio.Group>
                    )}
                </Form.Item>
                );
        }
        else
        {
            return (
                <Form.Item>
                    {getFieldDecorator('modules', {rules: [{ required: true, message: '请选择编译模块' }]}) (
                    <Checkbox.Group>
                    {
                        this.state.modules.map((element) => {
                            return (<Checkbox value={element.value} disabled={this.getModuleDisabled(element.value)}>{element.name}</Checkbox>)
                        })
                    }
                    </Checkbox.Group>
                    )}
                </Form.Item>
                );
        }
    }

    render () {
        const { getFieldDecorator } = this.props.form;
        var component = (
            <Form layout="vertical" onSubmit={this.onSubmit.bind(this)}>
                <Divider orientation="left"><Typography.Title level={4}>功能组件</Typography.Title></Divider>
                {this.getModuleSelectComponent()}
                <Divider orientation="left"><Typography.Title level={4}>备注</Typography.Title></Divider>
                <Form.Item>
                    {getFieldDecorator('readme') (
                        <Input addonBefore="备注" style={{width: 700}} placeholder="请输入备注"/>  
                    )}
                </Form.Item>
                <Button style={{ marginRight: 8 }} onClick={() => { this.props.OnBackClick() }}>上一步</Button>
                <Button type="primary" htmlType="submit">下一步</Button>
            </Form>
        );
        return component;
    }
}