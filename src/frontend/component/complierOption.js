import React from 'react';
import 'antd/dist/antd.css';
import { Checkbox, Divider, Typography, Cascader, Input, Form, Button } from 'antd';
import $ from 'jquery';

export class ComplierOptionFormTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource : [],
            isWindows : true,
            platform_node : null,
        };
        this.maxversion = 99999;
    }

    RefreshSvn(force) {
        $.ajax({
            type: "get",
            url:  "/svn",
            success: (data, status) => {
                if (status == "success") {
                    if (data.result == 0) {
                        var svn = this.props.form.getFieldsValue().svn_version;
                        console.log("svn: " + svn);
                        if (force || svn == 0) {
                            this.props.form.setFieldsValue({
                                svn_version : data.version
                            })
                        }
                        this.maxversion = parseInt(data.version);
                    }
                }
            }
        });
    }

    RefreshDataSource() {
        $.ajax({
            type: "get",
            url:  "/path/" + this.props.software + "/list",
            contentType: "application/json",
            success: (data, status) => {
                if (status == "success") {
                    this.setState({ dataSource : data.platform });
                }
            }
        });
    }

    onSelectChange(value) {
        var node = this.state.dataSource;

        value.forEach(element => {
            node.some(item => {
                if (item.name == element) {
                    if (item.children != undefined) {
                        node = item.children;
                    } else {
                        node = item;
                    }
                    return true;
                }
            })
        });  

        this.setState({platform_node : node});

        if (node.name == "Windows") {
            this.setState({ isWindows : true})
            this.props.form.setFieldsValue({
                complier_option : ["0", "1", "2", "3"]
            })
        } else {
            this.setState({ isWindows : false})
            this.props.form.setFieldsValue({
                complier_option : ["0", "1", "3"]
            })
        }

        this.props.form.setFieldsValue({
            codepath : node.codepath
        })
    }

    onSvnButtonClick() {
        this.RefreshSvn(true);
    }

    componentDidMount() {
        this.RefreshDataSource();
        this.RefreshSvn(false);
        this.setState({ platform_node : this.props.mission_complier_option.platform_node });
        if (this.props.mission_complier_option.platform_values.length > 0) {
            this.setState({ isWindows : this.props.mission_complier_option.platform_values[0] == 'Windows' });
        }
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmit(values, this.state.platform_node);
            }
        });
    };

    render () {
        const { getFieldDecorator } = this.props.form;
        var component = (
            <Form layout="vertical" onSubmit={this.onSubmit.bind(this)}>
                <Divider orientation="left"><Typography.Title level={4}>选择平台</Typography.Title></Divider>
                <Form.Item>
                    {getFieldDecorator (
                        'platform_values',
                        {rules: [{ required: true, message: '请选择编译平台' }]})
                        (<Cascader 
                            style={{width: 500}}
                            options={this.state.dataSource}
                            onChange={this.onSelectChange.bind(this)}
                            fieldNames={{ label : 'description', value: 'name', children: 'children' }} />)
                    }
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator(
                        'codepath',
                        {rules: [{ required: true, message: '请输入代码分支' }]})
                        (<Input addonBefore="代码路径" style={{width: 800}} readonly="true"/>)
                    }
                </Form.Item>
                <Divider orientation="left"><Typography.Title level={4}>版本选项</Typography.Title></Divider>
                <Form.Item>
                    {getFieldDecorator(
                        'svn_version',
                        {rules: [{ required: true, message: '请输入SVN版本号' }]})
                        (<Input style={{width: 250, marginRight: 20}} 
                            addonBefore="SVN版本号" 
                            placeholder="请输入SVN版本号"/>)
                    }
                    <Button type="primary" onClick={this.onSvnButtonClick.bind(this)}>获取最新SVN版本号</Button>
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator(
                        'version',
                        {rules: [{ required: true, message: '请输入版本号' }]})
                        (<Input 
                            addonBefore="版本号" 
                            style={{width: 250}}
                            placeholder="请输入版本号"/>)
                    }
                </Form.Item>
                <Divider orientation="left"><Typography.Title level={4}>编译选项</Typography.Title></Divider>
                <Form.Item>
                    {getFieldDecorator(
                        'complier_option')
                        (<Checkbox.Group defaultValue={["0", "1", "2", "3"]}>
                            <Checkbox value="0">清理工程</Checkbox>
                            <Checkbox disabled={!this.state.isWindows} value="1">编译程序</Checkbox>
                            <Checkbox disabled={!this.state.isWindows} value="2">编译驱动</Checkbox>
                            <Checkbox disabled={!this.state.isWindows} value="3">打包程序</Checkbox>
                        </Checkbox.Group>)
                    }
                </Form.Item>
                <Button type="primary" htmlType="submit">下一步</Button>
            </Form>
        );
        return component;
    }
}