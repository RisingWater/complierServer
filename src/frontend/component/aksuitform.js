import React from 'react';
import 'antd/dist/antd.css';
import { Steps, Layout, Form } from 'antd';
import { ComplierOptionFormTemplate } from './complierOption.js'
import { AKSuitComplierModuleFormTemplate } from './aksuitComplierModule.js'
import { AKSuitClientMissionCheckContent } from './aksuitMissionCheck.js'

export class AKSuitForm extends React.Component {
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
                    title: '定制版本信息',
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
                readme : ""
            },
        };
    }
    
    OnBackClick() {
        const current = this.state.currentStep - 1;
        this.setState({ currentStep : current});
    }

    onComplierOptionSubmit(values, node) {
        console.log('Received values of complier option form: ', values);
        console.log('Received node of complier option form: ', node);

        var packages = this.state.mission_complier_module.packages;
        var packages_enable = [];

        if (node.packages_config) {
            packages = node.default_packages;
            packages_enable = node.enable_packages;
        }

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
                readme :  this.state.mission_complier_module.readme,
            }
        })

        const current = this.state.currentStep + 1;
        this.setState({ currentStep : current });
    }

    onComplierModuleSubmit(values) {
        console.log('Received values of complier package form: ', values);

        var package_array = new Array();
        if (!Array.isArray(values.packages)) {
            var value = values.packages;
            package_array.push(value);
        } else {
            package_array = values.packages;
        }

        this.setState( { 
            mission_complier_module : {
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

    complierOptionContent() {
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
                    software="aksuit"
                    mission_complier_option={this.state.mission_complier_option}
                    onChange={this.ComplierOptionFormChange.bind(this)}
                    wrappedComponentRef={this.saveComplierOptionFormRef.bind(this)}
                    onSubmit={this.onComplierOptionSubmit.bind(this)}/>
            </div>
        );
    }

    complierModuleContent() {
        const ComplierModuleForm = Form.create({
            name: 'ComplierModule',
            onFieldsChange : (props, changedFields, allFields) => {
               props.onChange(allFields);
            },

            mapPropsToFields: (props) => {
                return {
                    readme: Form.createFormField({
                        value: props.mission_complier_module.readme,
                    }),
                };
           }
           })(AKSuitComplierModuleFormTemplate);

        return (
            <div className="mission_layout">
                <ComplierModuleForm 
                    software="aksuit"
                    mission_complier_module={this.state.mission_complier_module}
                    onChange={this.ComplierModuleFormChange.bind(this)}
                    wrappedComponentRef={this.saveComplierModuleFormRef.bind(this)}
                    onSubmit={this.onComplierModuleSubmit.bind(this)}
                    OnBackClick={this.OnBackClick.bind(this)}/>
            </div>
        );
    }
 
    missionCheckContent() {
        return (
            <div className="mission_layout">
                <AKSuitClientMissionCheckContent 
                    software="aksuit"
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
            return this.complierOptionContent();
        } else if (this.state.currentStep == 1) {
            return this.complierModuleContent();
        } else if (this.state.currentStep == 2) {
            return this.missionCheckContent();
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