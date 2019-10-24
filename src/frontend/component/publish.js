import React from 'react';
import 'antd/dist/antd.css';
import { Table, Card, Avatar, Tag, Button, Icon, List, Divider, Switch } from 'antd';
import $ from 'jquery';

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
            subscribe : false,
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

        this.setState ({ subscribe : this.props.subscribe });
    }

    Subscribe(checked, event) {
        this.setState ({ subscribe : checked });

        var json = { "subscribe": checked };

        $.ajax({
            type: "post",
            url:  "/user/" + this.props.user.userid + "/subscribe/" + this.props.software,
            contentType: "application/json",
            async: false,
            data: JSON.stringify(json),
            success: (data, status) => {
                if (status == "success" && data.result == 0) {
                    this.setState ({ subscribe : checked });
                    this.props.reload_user();
                } else {
                    console.log("subscribe fail");
                }
            }
        })
    }

    getSubscribeItem() {
        if (this.props.user.userid == "guest") {
            return (
                <div/>
            )
        } else {
            return (
                <div>
                    <Switch checked={this.state.subscribe} onChange={this.Subscribe.bind(this)}/>
                    <Divider type="vertical"/>
                    { this.state.subscribe ? "已订阅" : "订阅版本更新信息" }
                </div>
            )
        }
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
                        <List.Item extra={ this.state.allow_subscribe ? this.getSubscribeItem() : <div/>}>
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
                    <PublishList 
                        software="weixunclient"
                        subscribe={this.props.user.subscribe.weixunclient}
                        user={this.props.user}
                        reload_user={this.props.reload_user}/>
                </div>
                <div className="mission_from">
                    <PublishList
                        software="sep"
                        subscribe={this.props.user.subscribe.sep}
                        user={this.props.user}
                        reload_user={this.props.reload_user}/>
                </div>
                <div className="mission_from">
                    <PublishList
                        software="other"
                        subscribe={false}
                        user={this.props.user}
                        reload_user={this.props.reload_user}/>
                </div>
            </div>
        )
    }
}