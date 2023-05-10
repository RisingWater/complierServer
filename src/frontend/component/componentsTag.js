import React from 'react';
import 'antd/dist/antd.css';
import { Tag } from 'antd';

export class ComponentsTag extends React.Component {
    getXred(option) {
        if ((option & 1) != 0) {
            return (<Tag color="blue">XRED组件</Tag>);
        } else {
            return;
        }
    }

    getSEP(option) {
        if ((option & 2) != 0) {
            return (<Tag color="cyan">SEP组件</Tag>);
        } else {
            return;
        }
    }

    getUI(option) {
        if ((option & 4) != 0) {
            return (<Tag color="purple">UI组件</Tag>);
        } else {
            return;
        }
    }

    getVDA(option) {
        if ((option & 8) != 0) {
            return (<Tag color="volcano">VDA组件</Tag>);
        } else {
            return;
        }
    }

    getCCM(option) {
        if ((option & 16) != 0) {
            return (<Tag color="magenta">CCM组件</Tag>);
        } else {
            return;
        }
    }


    getTags(option) {
        return (<div>{this.getXred(option)}{this.getSEP(option)}{this.getUI(option)}{this.getVDA(option)}{this.getCCM(option)}</div>);
    }

    render() {
        const option = parseInt(this.props.option);
        return (
            <div>{this.getTags(option)}</div>
        )
    }
}