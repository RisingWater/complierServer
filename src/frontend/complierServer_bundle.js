import React from 'react';
import ReactDOM from 'react-dom';
import { Layout } from 'antd';
import { HeaderBar } from './component/headerbar.js'
import { SideMenu  } from './component/sideMenu.js'
import { MissionList } from './component/missionList.js'

class RootContext extends React.Component {
    constructor(props,context) {
        super(props,context)
        this.state = {
            menuSelectedkey : "1"
        };
    }

    onMenuSelectChange(key){
        var state = {"menuSelectedkey" : key};
        console.log(state);
        this.setState(state);
    }

    getTable() {
        if (this.state.menuSelectedkey == 1) {
            return (<div/>);
        } else if (this.state.menuSelectedkey == 2) {
            return (<MissionList/>);
        } else if (this.state.menuSelectedkey == 3) {
            return (<div/>);    
        } else {
            return (<div>{this.state.menuSelectedkey}</div>);
        }
    }

    render() {
        const Menus = [ { name : "发布版本", key : "1", disable: true}, { name : "任务列表", key : "2", disable: false}, { name : "新建任务", key : "3", disable: true} ];
        return (
            <Layout>
                <HeaderBar title="编译服务平台"/>
                <Layout>
                    <SideMenu menuSelectedChange={this.onMenuSelectChange.bind(this)} menus={Menus} selectKey={['1']}/>
                    <Layout>
                        <Layout.Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 1024,}}>
                            {this.getTable()}
                        </Layout.Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

ReactDOM.render(
    <RootContext/>,
    document.getElementById("root")
);