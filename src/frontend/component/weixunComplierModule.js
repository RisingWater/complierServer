import React from 'react';
import 'antd/dist/antd.css';
import { Switch , Divider, Typography, Input, Form, Button, Upload, Icon, Checkbox  } from 'antd';

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

    onOEMSwitchChange(value) {
        console.log(value);
        this.setState({ oem_enable :value })
    }

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

    normFile(e) {
        console.log(e);
        if (Array.isArray(e)) {
            return e;
        }

        if (e.file.status == 'done') {
            return e.file.response.url;
        } else {
            return "/appicon/default_icon.png";
        }
    };

    render () {
        const { getFieldDecorator } = this.props.form;
        var component = (
            <Form layout="vertical" onSubmit={this.onSubmit.bind(this)}>
                <Divider orientation="left"><Typography.Title level={4}>功能组件</Typography.Title></Divider>
                <Form.Item>
                    {getFieldDecorator('modules') (
                        <Checkbox.Group>
                            {
                                this.state.modules.map((element) => {
                                    return (<Checkbox value={element.value} disabled={this.getModuleDisabled(element.value)}>{element.name}</Checkbox>)
                                })
                            }
                        </Checkbox.Group>
                    )}
                </Form.Item>
                <Divider orientation="left"><Typography.Title level={4}>OEM定制</Typography.Title></Divider>
                <Form.Item label="启用OEM定制">
                    {getFieldDecorator('custom', [ {valuePropName: "checked"} ]) (
                        <Switch defaultChecked={false} onChange={this.onOEMSwitchChange.bind(this)} disabled={true}></Switch>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('vendor_name') (
                        <Input addonBefore="厂家名称" style={{width: 500}} placeholder="请输入厂家名称" disabled={!this.state.oem_enable} /> 
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('product_name') (
                        <Input addonBefore="产品名称" style={{width: 500}} placeholder="请输入产品名称" disabled={!this.state.oem_enable} /> 
                    )}
                </Form.Item>                
                <Form.Item>
                    {getFieldDecorator('icon', [ {getValueFromEvent: this.normFile.bind(this)} ]) (
                        <Upload name="logo" 
                            accept= ".png"
                            action="/uploadicon"
                            listType="picture"
                            disabled={!this.state.oem_enable}>
                            <Button>
                                <Icon type="upload" />点击上传OEM图标
                            </Button>
                        </Upload> 
                    )}
                </Form.Item>
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