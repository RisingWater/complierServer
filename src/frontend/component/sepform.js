import React from 'react';
import 'antd/dist/antd.css';
import { Steps, Layout, Form } from 'antd';
import { ComplierOptionFormTemplate } from './complierOption.js'
import { SEPComplierModuleFormTemplate } from './sepComplierModule.js'
import { SEPMissionCheckContent } from './sepMissionCheck.js'

export class SepForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            windows : true,
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

            mission_complier_option : {
                platform_values : [],
                platform_node : null,
                codepath : "",
                svn_version : 0,
                version : "",
                complier_option : [],
            },

            mission_complier_module : {
                protocols : [],
                protocols_enable : [],
                modules : [],
                modules_enable : [],
                license_option : 0,
                readme : ""
            }
        };
    }
    
    OnBackClick() {
        const current = this.state.currentStep - 1;
        this.setState({ currentStep : current});
    }

    onComplierOptionSubmit(values, node) {
        console.log('Received values of complier option form: ', values);
        console.log('Received node of complier option form: ', node);

        var protocols = this.state.mission_complier_module.protocols;
        var protocols_enable = [];
        var modules = this.state.mission_complier_module.modules;
        var modules_enable = [];

        if (node.protocol_config) {
            protocols = node.default_protocol;
            protocols_enable = node.enable_protocol;
        }

        if (node.module_config) {
            modules = node.default_module;
            modules_enable = node.enable_module;
        }

        var test = {
            protocols : protocols,
            protocols_enable : protocols_enable,
            modules : modules,
            modules_enable : modules_enable,
            license_option : this.state.mission_complier_module.license_option,
            readme :  this.state.mission_complier_module.readme,
        }

        console.log("new module: " + test);

        this.setState( { 
            mission_complier_option : {
                platform_values : values.platform_values,
                platform_node : node,
                codepath : values.codepath,
                svn_version : values.svn_version,
                version : values.version,
                complier_option : values.complier_option,
            },

            mission_complier_module : {
                protocols : protocols,
                protocols_enable : protocols_enable,
                modules : modules,
                modules_enable : modules_enable,
                license_option : this.state.mission_complier_module.license_option,
                readme :  this.state.mission_complier_module.readme,
            }
        })

        const current = this.state.currentStep + 1;
        this.setState({ currentStep : current });
    }

    onComplierModuleSubmit(values) {
        console.log('Received values of complier module form: ', values);

        this.setState( { 
            mission_complier_module : {
                protocols : values.protocols,
                protocols_enable : this.state.mission_complier_module.protocols_enable,
                modules : values.modules,
                modules_enable : this.state.mission_complier_module.modules_enable,
                license_option : values.license_option,
                readme : values.readme,
            }
        })

        const current = this.state.currentStep + 1;
        this.setState({ currentStep : current });
    }

    onComplierCheckSubmit() {
        console.log("on submit");
        this.props.jumpToMissionList();
    }

    saveComplierOptionFormRef(formRef) {
        this.complierOptionFormRef = formRef;
    };

    saveComplierModuleFormRef(formRef) {
        this.complierModuleFormRef = formRef;
    };

    ComplierOptionFormChange(allFields) {

    };

    ComplierModuleFormChange(allFields) {

    };

    first_step_content() {
        const ComplierOptionForm = Form.create({
            name: 'ComplierOption',
            onFieldsChange : (props, changedFields, allFields) => {
               props.onChange(allFields);
            },

            mapPropsToFields: (props) => {
                return {
                    platform_values: Form.createFormField({
                        value: props.mission_complier_option.platform_values,
                    }),
                    codepath: Form.createFormField({
                        value: props.mission_complier_option.codepath,
                    }),
                    svn_version: Form.createFormField({
                        value: props.mission_complier_option.svn_version,
                    }),
                    version: Form.createFormField({
                        value: props.mission_complier_option.version,
                    }),
                    complier_option: Form.createFormField({
                        value: props.mission_complier_option.complier_option,
                    }),
                };
           }
           })(ComplierOptionFormTemplate);

        return (
            <div className="mission_layout">
                <ComplierOptionForm 
                    software="sep"
                    mission_complier_option={this.state.mission_complier_option}
                    onChange={this.ComplierOptionFormChange.bind(this)}
                    wrappedComponentRef={this.saveComplierOptionFormRef.bind(this)}
                    onSubmit={this.onComplierOptionSubmit.bind(this)}/>
            </div>
        );
    }

    second_step_content() {
        const ComplierModuleForm = Form.create({
            name: 'ComplierModule',
            onFieldsChange : (props, changedFields, allFields) => {
               props.onChange(allFields);
            },

            mapPropsToFields: (props) => {
                return {
                    protocols: Form.createFormField({
                        value: props.mission_complier_module.protocols,
                    }),
                    modules: Form.createFormField({
                        value: props.mission_complier_module.modules,
                    }),
                    license_option: Form.createFormField({
                        value: props.mission_complier_module.license_option,
                    }),
                    readme: Form.createFormField({
                        value: props.mission_complier_module.readme,
                    }),
                };
           }
           })(SEPComplierModuleFormTemplate);

        return (
            <div className="mission_layout">
                <ComplierModuleForm 
                    software="sep"
                    mission_complier_module={this.state.mission_complier_module}
                    onChange={this.ComplierModuleFormChange.bind(this)}
                    wrappedComponentRef={this.saveComplierModuleFormRef.bind(this)}
                    onSubmit={this.onComplierModuleSubmit.bind(this)}
                    OnBackClick={this.OnBackClick.bind(this)}/>
            </div>
        );
    }

    third_step_content() {
        return (
            <div className="mission_layout">
                <SEPMissionCheckContent 
                    software="sep"
                    complier_option={this.state.mission_complier_option}
                    complier_module={this.state.mission_complier_module}
                    onSubmit={this.onComplierCheckSubmit.bind(this)}
                    OnBackClick={this.OnBackClick.bind(this)}
                    user={this.props.user}
                />
            </div>
        )
    }

    get_content() {
        if (this.state.currentStep == 0) {
            return this.first_step_content();
        } else if (this.state.currentStep == 1) {
            return this.second_step_content();
        } else if (this.state.currentStep == 2) {
            return this.third_step_content();
        }
    }

    render () {
        return (
            <div>
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
                </div>
            </div>
        )
    }
}