import React from 'react';
import 'antd/dist/antd.css';
import { Steps, Layout, Button } from 'antd';
import { PlatformSelect, VersionInput, ComplierFlowCheck, ProtocolCheck, ModuleCheck, LicenseRadio, ReadmeInput } from './complier_component.js'

export class SepForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            windows : true,
            complierServer : null,
            currentStep : 0,
            steps : [
                {
                    title: '定制编译选项',
                },
                {
                    title: '定制功能参数',
                },
                {
                    title: '添加编译任务',
                },
            ],
            mission_platform : [],
            mission_codepath : "",
            mission_svn : 0,
            mission_version : "",
            mission_complier_option : [],
            mission_protocol_option : [],
            mission_module_option : [],
            mission_license_option : 0,
            mission_readme : "",
        };
    }

    saveFlowCheckRef(ref) {
        this.flowCheck = ref;
    }; 
    
    onPlatformSelectChange(node, value) {
        var isWindows = (node.name == "Windows");

        this.setState({windows : isWindows});
        this.flowCheck.changePlatform(isWindows);
        
        console.log("codepath：" + node.codepath);
        console.log("platform_select_values: " + value);
        this.setState({
            complierServer : node, 
            mission_platform: value,
            mission_codepath: node.codepath,
            mission_protocol_option : [],
            mission_module_option : [],
        });
    }

    onVersionChange(svn, version) {
        console.log("svn" + svn);
        console.log("version: " + version);
        this.setState({
            mission_version : version,
            mission_svn : svn,
        });
    }

    onComplierOptionChange(value) {
        console.log("complier option: " + value);
        this.setState({
            mission_complier_option : value
        });
    }

    onProtocolOptionChange(value) {
        console.log("protocol option: " + value);
        this.setState({
            mission_protocol_option : value
        });
    }

    onModuleOptionChange(value) {
        console.log("module option: " + value);
        this.setState({
            mission_module_option : value
        });
    }

    onLicenseOptionChange(value) {
        console.log("license option: " + value);
        this.setState({
            mission_license_option : value
        });
    }

    onReadmeChange(value) {
        console.log("readme:" + value);
        this.setState({
            mission_readme : value
        })
    }

    next() {
        const current = this.state.currentStep + 1;
        this.setState({ currentStep : current });
    }
    
    prev() {
        const current = this.state.currentStep - 1;
        this.setState({ currentStep : current});
    }

    first_step_content() {
        return (
            <div className="mission_layout">
                <PlatformSelect 
                    value={this.state.mission_platform}
                    codepath={this.state.mission_codepath}
                    software="sep"
                    onSelectChange={this.onPlatformSelectChange.bind(this)}/>
                <VersionInput 
                    svn_version={this.state.mission_svn}
                    version={this.state.mission_version}
                    onVersionChange={this.onVersionChange.bind(this)}
                    />
                <ComplierFlowCheck 
                    onRef={this.saveFlowCheckRef.bind(this)}
                    windows={this.state.windows}
                    complier_option={this.state.mission_complier_option}
                    onComplierOptionChange={this.onComplierOptionChange.bind(this)}/>
            </div>
        )
    }

    second_step_content() {
        return (
            <div className="mission_layout">
                <ProtocolCheck 
                    windows={this.state.windows}
                    protocol_option={this.state.mission_protocol_option}
                    onProtocolOptionChange={this.onProtocolOptionChange.bind(this)}
                    />
                <ModuleCheck 
                    windows={this.state.windows}
                    module_option={this.state.mission_module_option}
                    onModuleOptionChange={this.onModuleOptionChange.bind(this)}
                    />
                <LicenseRadio
                    license_option={this.state.mission_license_option}
                    onLicenseOptionChange={this.onLicenseOptionChange.bind(this)}
                    />
                <ReadmeInput
                    readme={this.state.mission_readme}
                    onReadmeChange={this.onReadmeChange.bind(this)}
                    />
            </div>
        )
    }

    get_content() {
        if (this.state.currentStep == 0) {
            return this.first_step_content();
        } else if (this.state.currentStep == 1) {
            return this.second_step_content();
        }
    }

    next_button () {
        if (this.state.currentStep < this.state.steps.length - 1) {
            return (<Button type="primary" onClick={() => this.next()}>下一步</Button>);
        }
        else {
            return ("");
        }
    }

    done_button () {
        if (this.state.currentStep === this.state.steps.length - 1) {
            return (<Button type="primary" onClick={() => {}}>完成任务</Button>);
        }
        else {
            return ("");
        }
    }

    prev_button () {
        if (this.state.currentStep > 0) {
            return (<Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>上一步</Button>);
        }
        else {
            return ("");
        }
    }

    render () {
        return (
            <div className="mission_step_layout">
                <Steps current={this.state.currentStep}>
                    {this.state.steps.map(item => (
                        <Steps.Step key={item.title} title={item.title} />
                    ))}
                </Steps>

                <Layout>
                    <Layout.Content style={{background: '#fff', padding: 24, margin: 0}}>
                        {this.get_content()}
                    </Layout.Content>
                </Layout>

                <div className="mission_layout mission-action">
                    {this.next_button()}
                    {this.done_button()}
                    {this.prev_button()}
                </div>
            </div>
        )
    }
}