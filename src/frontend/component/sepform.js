import React from 'react';
import 'antd/dist/antd.css';
import { Checkbox, Divider, Typography, Cascader, Input } from 'antd';
import $ from 'jquery';

class PlatformSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            codepath: "",
        };
    }

    RefreshData() {
        console.log("RefreshData");
        $.ajax({
            type: "get",
            url:  "/path/" + this.props.software + "/list",
            contentType: "application/json",
            success: (data, status) => {
                if (status == "success") {
                    this.setState({ dataSource : data.platform });
                    console.log(data.platform);
                    console.log("ajax ok");
                }
            }
        });
    }

    componentDidMount() {
        this.RefreshData();
    }

    onSelectChange(value) {
        var complierParam = null;
        this.props.onSelectChange(value);
        this.state.dataSource.some(item => {
            if (item.name == value[0]) {
                item.children.some(item => {
                    if (item.name == value[1]) {
                        item.children.some(item => {
                            if (item.name == value[2]) {
                                complierParam = item;
                            }
                        })
                    }
                })
            }
        })

        if (complierParam != null) {
            console.log(complierParam);
            this.setState({codepath: complierParam.codepath})
        }
    }

    render() {
        return (
            <div>
                <Divider orientation="left"><Typography.Title level={4}>选择平台</Typography.Title></Divider>
                <div className="mission_from">
                    <Cascader 
                        style={{width: 500}}
                        options={this.state.dataSource}
                        onChange={this.onSelectChange.bind(this)}
                        fieldNames={{ label : 'description', value: 'name', children: 'children' }} />
                </div>
                <div className="mission_from">
                    <Input addonBefore="代码路径" style={{width: 800}} value={this.state.codepath}/>
                </div>
            </div>
        )
    }
}

class ComplierFlowCheck extends React.Component {
    render() {
        var defaultValue = [ "0", "1", "3" ];
        if (this.props.windows) {
            defaultValue.push("2");
        } 

        return (
            <div>
                <Divider orientation="left"><Typography.Title level={4}>编译选项</Typography.Title></Divider>
                <div className="mission_from">
                    <Checkbox.Group defaultValue={defaultValue} value={defaultValue}>
                        <Checkbox value="0">清理工程</Checkbox>
                        <Checkbox disabled={!this.props.windows} value="1">编译程序</Checkbox>
                        <Checkbox disabled={!this.props.windows} value="2">编译驱动</Checkbox>
                        <Checkbox disabled={!this.props.windows} value="3">打包程序</Checkbox>
                    </Checkbox.Group>
                </div>
            </div>
        )
    }
}

class ProtocolCheck extends React.Component {
    render() {
        var defaultValue = [ "0", "1", "2", "3" ];
        if (!this.props.windows) {
            defaultValue.push("4");
        }

        return (
            <div>
                <Divider orientation="left"><Typography.Title level={4}>协议组件</Typography.Title></Divider>
                <div className="mission_from">
                    <Checkbox.Group defaultValue={defaultValue} value={defaultValue}>
                        <Checkbox value="0" disabled={!this.props.windows}>ICA协议</Checkbox>
                        <Checkbox value="1" disabled={!this.props.windows}>PCOIP协议</Checkbox>
                        <Checkbox value="2" disabled={!this.props.windows}>RDP协议</Checkbox>
                        <Checkbox value="3" disabled={!this.props.windows}>XRED协议</Checkbox>
                        <Checkbox value="4" disabled={!this.props.windows}>TCP/IP</Checkbox>
                    </Checkbox.Group>
                </div>
            </div>
        )
    }
}

class ModuleCheck extends React.Component {
    render() {
        var defaultValue = [ "0", "1", "2", "4", "6", "7", "9" ];
        if (this.props.windows) {
            defaultValue.push("8");
        }

        return (
            <div>
                <Divider orientation="left"><Typography.Title level={4}>功能组件</Typography.Title></Divider>
                <div className="mission_from">
                    <Checkbox.Group defaultValue={defaultValue} value={defaultValue}>
                        <Checkbox value="0">USB重定向</Checkbox>
                        <Checkbox value="6">磁盘重定向</Checkbox>
                        <Checkbox value="8" disabled={!this.props.windows}>打印机重定向</Checkbox>
                        <Checkbox value="4">串并口重定向</Checkbox>
                        <Checkbox value="7">摄像头重定向</Checkbox>
                        <Checkbox value="2">扫描仪重定向</Checkbox>
                        <Checkbox value="1">视频重定向</Checkbox>
                        <Checkbox value="9">自动升级</Checkbox>
                    </Checkbox.Group>
                </div>
            </div>
        )
    }
}

export class SepForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            windows : true,
            platform : [],
        };
    }

    onPlatformSelectChange(key){
        if (key[0] == "Windows")
        {
            this.setState({windows : true});
        }
        else
        {
            this.setState({windows : false});
        }

        this.setState({ platform : key});
        console.log(this.state.platform);
    }

    render () {
        return (
            <div>
                <PlatformSelect software="sep" onSelectChange={this.onPlatformSelectChange.bind(this)}/>
                <ComplierFlowCheck windows={this.state.windows}/>
                <ProtocolCheck windows={this.state.windows}/>
                <ModuleCheck windows={this.state.windows}/>
            </div>
        )
    }
}