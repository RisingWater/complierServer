import React from 'react';
import 'antd/dist/antd.css';
import { Table, Card, Avatar, Tag, Button, Icon, List, Divider } from 'antd';
import $ from 'jquery';

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
    constructor(props) {
        super(props);
        this.state = {
            title : "",
            description : "",
            image : "",
            span_url : "",
            allow_subscribe : false,
            list : [],
        };
    }

    componentDidMount() {
        $.ajax({
            type: "get",
            url:  "/publish/" + this.props.software + "/list",
            success: (data, status) => {
                if (status == "success") {
                    this.setState({ 
                        title : data.title,
                        description : data.description,
                        image : data.image,
                        span_url : data.span_url,
                        allow_subscribe : data.allow_subscribe,
                        list : data.list,
                    });
                    console.log(data);
                }
            }
        })
    }

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
                    <List>
                        <List.Item extra={ this.state.allow_subscribe ? <Button>订阅版本更新信息</Button> : <div/>}>
                            <List.Item.Meta
                                avatar={ <Avatar src={this.state.image} /> }
                                title= { <h3>{this.state.title}</h3>}
                                description={this.state.description}
                            />
                        </List.Item>
                    </List>
                    <Divider />
                    <Table 
                        size="middle"
                        columns = {columns}
                        dataSource = {this.state.list}
                        pagination = { false }
                        showHeader = { false }
                        />
                    <br/>
                    { this.state.span_url == "" ? <div/> : <PublishListFooter url={this.state.span_url}/> }
                </Card>
            </div>
        )
    }
}

export class PublishPage extends React.Component {

    render() {
        return (
            <div className="mission_step_layout">
                <div className="mission_from">
                    <PublishList software="weixunclient"/>
                </div>
                <div className="mission_from">
                    <PublishList software="sep"/>
                </div>
                <div className="mission_from">
                    <PublishList software="other"/>
                </div>
            </div>
        )
    }
}