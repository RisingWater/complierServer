import React from 'react';
import ReactDOM from 'react-dom';
import { Layout } from 'antd';
import { HeaderBar } from './component/headerbar.js'
import { SideMenu  } from './component/sideMenu.js'
import { MissionList } from './component/missionList.js'
import { PublishPage } from './component/publish.js'
import { SepForm } from './component/sepform.js'
import $ from 'jquery';


class RootContext extends React.Component {
    constructor(props,context) {
        super(props,context)
        this.state = {
            menuSelectedkey : "publish"
        }
    }

    onMenuSelectChange(key){
        var state = {"menuSelectedkey" : key};
        console.log(state);
        this.setState(state);
    }

    getTable() {
        if (this.state.menuSelectedkey == "publish") {
            return (<PublishPage/>)
        } else if (this.state.menuSelectedkey == "mission_list") {
            return (<MissionList/>);
        } else if (this.state.menuSelectedkey == "new_sep") {
            return (<SepForm/>);
        } else if (this.state.menuSelectedkey == "new_weixun") {
            return (<div></div>);
        } else if (this.state.menuSelectedkey == "new_solution") {  
            return (<div></div>);
        } else {  
            return (<div></div>);
        }
    }

    render() {
        var height = $(window).height() - 64;
        return (
            <Layout>
                <HeaderBar title="编译服务平台"/>
                <Layout>
                    <SideMenu menuSelectedChange={this.onMenuSelectChange.bind(this)}/>
                    <Layout>
                        <Layout.Content style={{background: '#fff', padding: 24, margin: 0, minHeight: height,}}>
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