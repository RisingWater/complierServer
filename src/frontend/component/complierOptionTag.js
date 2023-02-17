import React from 'react';
import 'antd/dist/antd.css';
import { Tag } from 'antd';

export class ComplierOptionTag extends React.Component {
    getClear(option) {
        if ((option & 1) != 0) {
            return (<Tag color="volcano">清理工程</Tag>);
        } else {
            return (<div></div>);
        }
    }

    getComplierProgram(option) {
        if ((option & 2) != 0) {
            return (<Tag color="blue">编译程序</Tag>);
        } else {
            return (<div></div>);
        }
    }
    
    getComplierDriver(option) {
        if ((option & 4) != 0) {
            return (<Tag color="cyan">编译驱动</Tag>);
        } else {
            return (<div></div>);
        }
    }

    getPack(option) {
        if ((option & 8) != 0) {
            return (<Tag color="purple">打包</Tag>);
        } else {
            return (<div></div>);
        }
    }

    getNoCCM(option) {
        if ((option & 16) != 0) {
            return (<Tag color="magenta">无CCM</Tag>);
        } else {
            return (<div></div>);
        }
    }

    isFullProcess(option) {
        if ((option & 15) == 15 || option == 0) {
            return true;
        } else {
            return false;
        }
    }

    getTags(option) {
        if (this.isFullProcess(option)) {
            return (<div><Tag color="green">完整流程</Tag> {this.getNoCCM(option)}</div>);
        }
        else
        {
            return (<div>{this.getClear(option)}{this.getComplierProgram(option)}{this.getComplierDriver(option)}{this.getPack(option)}{this.getNoCCM(option)}</div>);
        }
    }

    render() {
        const option = parseInt(this.props.option);
        return (
            <div>{ this.getTags(option) }</div>
        )
    }
}