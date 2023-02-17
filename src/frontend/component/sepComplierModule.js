import React from 'react';
import 'antd/dist/antd.css';
import { Checkbox, Divider, Typography, Input, Form, Button, Radio } from 'antd';
import $ from 'jquery';

export class SEPComplierModuleFormTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            protocols : [],
            modules : [],
            disable_all_module : false,
            packages : [
                {
                    "value" : "0",
                    "name" : "SEP协议服务端",
                    "force_module" : true,
                    "modules" : [ "0", "6" ],
                    "modules_enable" : [],
                },
                {
                    "value" : "1",
                    "name" : "SEP协议客户端",
                    "force_module" : false,
                },
            ],
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
	
	onLicenseOptionChange(value) {
        console.log(value);
		if(value == 2)
		{
			this.setState({ license_time_enable :true })
		}
		else
		{
			this.setState({ license_time_enable :false })
		}
       
    }

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

        if (this.state.disable_all_module) {
            return true;
        }

        this.props.mission_complier_module.modules_enable.some((element) => {
            if (element == value) {
                disabled = false;
                return true;
            }
        })

        return disabled;
    }

    getPackageDisabled(value) {
        var disabled = true;
        console.log(this.props.mission_complier_module);
        this.props.mission_complier_module.packages_enable.some((element) => {
            if (element == value) {
                disabled = false;
                return true;
            }
        })

        return disabled;
    }

    handleChecked = (event) => {
        var curpackage = null;
        this.state.packages.some((element) => {
            if (element.value == event.target.value) {
                curpackage = element;
                return true;
            }
        })

        if (curpackage != null) {
            if (curpackage.force_module) {
                this.setState({disable_all_module : true});
            } else {
                this.setState({disable_all_module : false});
            }
        }
    }

    getPackageSelectComponent()
    {
        const { getFieldDecorator } = this.props.form;
        var enable = false;
        this.props.mission_complier_module.packages_enable.some((element) => {
            enable = true;
        })

        if (enable)
        {
            return (
                <Form.Item>
                {getFieldDecorator('packages', {rules: [{ required: true, message: '请选择编译组件' }]}) (
                    <Radio.Group>
                    {
                        this.state.packages.map((element) => {
                            return (<Radio value={element.value} disabled={this.getPackageDisabled(element.value)} onChange={this.handleChecked}>{element.name}</Radio>)
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
                    {getFieldDecorator('packages', {rules: [{ required: true, message: '请选择编译组件' }]}) (
                    <Checkbox.Group>
                    {
                        this.state.packages.map((element) => {
                            return (<Checkbox value={element.value} disabled={this.getPackageDisabled(element.value)}>{element.name}</Checkbox>)
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
                <Divider orientation="left"><Typography.Title level={4}>安装包类型</Typography.Title></Divider>
                {this.getPackageSelectComponent()}
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
                <Divider orientation="left"><Typography.Title level={4}>授权选项</Typography.Title></Divider>
                <Form.Item>
                    {getFieldDecorator('license_option') (
                        <Radio.Group buttonStyle="solid" defaultValue={0} onChange={this.onLicenseOptionChange.bind(this)}>  
                            <Radio.Button value={0} disabled={this.state.disable_all_module}>无授权</Radio.Button>
                            <Radio.Button value={1} disabled={this.state.disable_all_module}>永久授权</Radio.Button>
                            <Radio.Button value={2} disabled={this.state.disable_all_module}>缓存授权</Radio.Button>
                        </Radio.Group>
						
                    )}
				</Form.Item>
				<Form.Item>	
					{getFieldDecorator(
                        'license_time',
                        {rules: [{ required: false, message: '请输入缓存天数' }]})
                        (<Input 
							disabled={!this.state.license_time_enable}
                            addonBefore="缓存时间" 
                            style={{width: 250}}
                            placeholder="请输入缓存天数"/>)
                    }
					
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