import React from 'react';
import 'antd/dist/antd.css';
import { Tag } from 'antd';

export class ComponentsTag extends React.Component {
    getTags(option) {
        if (option == 0 || option == 31) {
            return (<div><Tag color="blue">XRED组件</Tag><Tag color="cyan">SEP组件</Tag><Tag color="purple">UI组件</Tag><Tag color="volcano">VDA组件</Tag><Tag color="magenta">CCM组件</Tag></div>);
        } else if (option == 15) {
            return (<div><Tag color="blue">XRED组件</Tag><Tag color="cyan">SEP组件</Tag><Tag color="purple">UI组件</Tag><Tag color="volcano">VDA组件</Tag></div>);
        } else {
            return (<div><Tag color="red">组件信息有误</Tag></div>);
        } 
    }

    render() {
        const option = parseInt(this.props.option);
        return (
            <div>{ this.getTags(option) }</div>
        )
    }
}