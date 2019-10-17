import React from 'react';
import 'antd/dist/antd.css';
import { List, Avatar, Tag, Button, Typography, Divider, Icon } from 'antd';

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
    renderItem(item) {
        return (
            <List.Item>
                <List.Item.Meta
                    avatar={<Avatar src={item.image_url} size={48} />}
                    title={ <span>
                                <h4>{item.name}</h4>
                                { item.beta ? <Tag color="red">beta测试版本</Tag> : <Tag color="green">稳定版本</Tag> }
                            </span>}
                />
                <Button type="primary" icon="download" href={item.url} target="_blank">点击下载</Button>
            </List.Item>
        )
    }

    render () {
        return (
            <div>
                <Divider orientation="left"><Typography.Title level={4}>{this.props.name}</Typography.Title></Divider>
                <List dataSource={this.props.dataSource}
                    size = "small"
                    footer = {<PublishListFooter url={this.props.span_url}/>}
                    renderItem = {this.renderItem.bind(this)}>
                </List>
            </div>
        )
    }
}

export class PublishPage extends React.Component {

    render() {
        var weixunPublish = [
            { name : "beta测试版", url : outputDir + "bin/6.5.0.47_20190929_1937230/", beta : true, image_url : "./image/weixunclient.png" },
            { name : "6.5正式版", url : publicDir + "stable/v6.5.0.13/", beta : false, image_url : "./image/weixunclient.png" },
            { name : "6.0正式版", url : publicDir + "stable/v6.0.0.2/", beta : false, image_url : "./image/weixunclient.png" },
        ];
        var sepPublish = [
            { name : "4.75稳定版", url : outputDir + "public/SEP/Latest Release/SEPV4.75/", beta : false, image_url : "./image/sep.png" },
            { name : "4.70稳定版", url : outputDir + "public/SEP/Older Releases/SEPV4.70/", beta : false, image_url : "./image/sep.png" },
        ];
        var otherPublish = [
            { name : "WeixunClient移动端", url : "https://risingwater-studio.com/ipainstall/", beta : true, image_url : "./image/weixunclient.png" },
            { name : "国产化软件版本", url : outputDir + "public/other/nationalization/", beta : true, image_url : "./image/weixunclient.png" },
        ];
        return (
            <div>
                <PublishList name="WeixunClient发布版本" dataSource={weixunPublish} span_url={publicDir + "stable/"}/>
                <PublishList name="SEP发布版本" dataSource={sepPublish} span_url={outputDir + "public/SEP/Older Releases/"}/>
                <PublishList name="其他版本" dataSource={otherPublish} span_url=""/>
            </div>
        )
    }
}