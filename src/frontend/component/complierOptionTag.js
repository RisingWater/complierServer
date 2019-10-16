import React from 'react';
import 'antd/dist/antd.css';
import { Tag } from 'antd';

export class ComplierOptionTag extends React.Component {
    getTags(option) {
        if (option == 0 || option == 15) {
            return (<Tag color="green">完整流程</Tag>);
        } else if (option == 14) {
            return (<div><Tag color="blue">编译程序</Tag><Tag color="cyan">编译驱动</Tag><Tag color="purple">打包</Tag></div>);
        } else if (option == 12) {
            return (<div><Tag color="cyan">编译驱动</Tag><Tag color="purple">打包</Tag></div>);
        } else if (option == 10) {
            return (<div><Tag color="blue">编译程序</Tag><Tag color="purple">打包</Tag></div>);
        } else if (option == 11) {
            return (<div><Tag color="purple">清理工程</Tag><Tag color="blue">编译程序</Tag><Tag color="purple">打包</Tag></div>);
        } else if (option == 8) {
            return (<div><Tag color="purple">打包</Tag></div>);
        }
    }

    render() {
        const option = parseInt(this.props.option);
        return (
            <div>{ this.getTags(option) }</div>
        )
    }
}