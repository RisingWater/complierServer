import React from 'react';
import 'antd/dist/antd.css';
import { Table, Card, Avatar, Tag, Button, Typography, Divider, Icon } from 'antd';

const publicDir = "http://192.168.12.127:8080/output/public/"
const outputDir = "http://192.168.12.127:8080/output/"

class PublishListFooter extends React.Component {
    render () {
        if (this.props.url == "") {
            return (<div/>);
        } else {
            return (
                <div className="centerblock">
                    <a href={this.props.url} target="_blank">
                        <Icon type="folder-open" style={{marginRight : 5}}/>
                        浏览所有版本
                    </a>
                </div>
            )
        }
    }
}

class PublishList extends React.Component {
    render () {
        const columns = [
            {
                title: '版本名称',
                width: 400,
                dataIndex: 'name',
            },
            {
                title: '版本类型',
                dataIndex: 'beta',
                render: (text, record) => (
                    record.beta ? <Tag color="volcano">测试版本</Tag> : <Tag color="green">稳定版本</Tag>
                )
            },
            {
                title: '下载地址',
                dataIndex: 'url',
                align: "right",
                render: (text, record) => (
                    <Button type="primary" icon="download" href={record.url} target="_blank">点击下载</Button>
                )
            },
        ]
        return (
            <div>
                <Card>
                    <Card.Meta
                        avatar={ <Avatar src={this.props.icon} /> }
                        title= {this.props.name}
                        description={this.props.description}
                    />
                    <br/>
                    <Table 
                        size="middle"
                        columns = {columns}
                        dataSource = {this.props.dataSource}
                        pagination = { false }
                        showHeader = { false }
                        />
                    <br/>
                    <PublishListFooter url={this.props.span_url}/>
                </Card>
            </div>
        )
    }
}

export class PublishPage extends React.Component {

    render() {
        var weixunPublish = [
            { name : "最新测试版", url : outputDir + "bin/6.5.0.47_20190929_1937230/", beta : true, },
            { name : "6.5正式版", url : publicDir + "stable/v6.5.0.13/", beta : false, },
            { name : "6.0正式版", url : publicDir + "stable/v6.0.0.2/", beta : false, },
        ];
        var sepPublish = [
            { name : "4.75稳定版", url : outputDir + "public/SEP/Latest Release/SEPV4.75/", beta : false },
            { name : "4.70稳定版", url : outputDir + "public/SEP/Older Releases/SEPV4.70/", beta : false },
        ];
        var otherPublish = [
            { name : "威讯云电脑移动端", url : "https://risingwater-studio.com/ipainstall/", beta : true },
            { name : "国产化软件版本", url : outputDir + "public/other/nationalization/", beta : true },
        ];
        return (
            <div className="mission_step_layout">
                <div className="mission_from">
                    <PublishList name="威讯云协议" 
                        description="威讯云协议是升腾创新的高性能虚拟桌面云协议，该协议可在确保优化带宽占用的同时，确保桌面连接协议稳定和安全，可以随时随地为用户其提供内容极为丰富的最佳桌面体验。"
                        dataSource={weixunPublish}
                        icon="./image/weixunclient.png"
                        span_url={publicDir + "stable/"}/>
                </div>

                <div className="mission_from">
                    <PublishList name="智能扩展协议"
                        description="智能扩展协议是升腾创新的协议扩展组件，可以依托于多种云桌面协议，提供外设重定向，视频增强等扩展功能，增强云桌面体验的好帮手。"
                        dataSource={sepPublish}
                        icon="./image/sep.png"
                        span_url={outputDir + "public/SEP/Older Releases/"}/>
                </div>

                <div className="mission_from">
                    <PublishList name="其他版本"
                        description=""
                        dataSource={otherPublish}
                        icon="./image/weixunclient.png"
                        span_url=""/>
                </div>
            </div>
        )
    }
}