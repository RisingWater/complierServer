import React from 'react';
import 'antd/dist/antd.css';
import { Checkbox, Divider, Typography, Input, Form, Button } from 'antd';
import $ from 'jquery';

export class SolutionComplierModuleFormTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            protocols : [],
            modules : [],
        };
    }

    RefreshDataSource() {
        $.ajax({
            type: "get",
            url:  "/path/sep/getconfig",
            contentType: "application/json",
            success: (data, status) => {
                if (status == "success") {
                    this.setState({ protocols : data.protocols, modules : data.modules });
                }
            }
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmit(values);
            }
        });
    };

    componentDidMount() {
        this.RefreshDataSource();
    }

    getProtocolDisabled(value) {
        var disabled = true;
        console.log(this.props.mission_complier_module);
        this.props.mission_complier_module.protocols_enable.some((element) => {
            if (element == value) {
                disabled = false;
                return true;
            }
        })

        return disabled;
    }

    getModuleDisabled(value) {
        var disabled = true;
        this.props.mission_complier_module.modules_enable.some((element) => {
            if (element == value) {
                disabled = false;
                return true;
            }
        })

        return disabled;
    }

    render () {
        const { getFieldDecorator } = this.props.form;
        var component = (
            <Form layout="vertical" onSubmit={this.onSubmit.bind(this)}>
                <Divider orientation="left"><Typography.Title level={4}>协议组件</Typography.Title></Divider>
                <Form.Item>
                    {getFieldDecorator('protocols') (
                        <Checkbox.Group>
                            {
                                this.state.protocols.map((element) => {
                                    return (<Checkbox value={element.value} disabled={this.getProtocolDisabled(element.value)}>{element.name}</Checkbox>)
                                })
                            }
                        </Checkbox.Group>
                    )}
                </Form.Item>
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