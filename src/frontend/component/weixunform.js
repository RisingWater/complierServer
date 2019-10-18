import React from 'react';
import 'antd/dist/antd.css';
import { Steps, Layout, Form } from 'antd';
import { ComplierOptionFormTemplate } from './complierOption.js'
import { WeixunClientComplierModuleFormTemplate } from './weixunComplierModule.js'
import { WeixunClientMissionCheckContent } from './weixunMissionCheck.js'

export class WeixunClientForm extends React.Component {
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
                modules : [],
                modules_enable : [],
                custom : false,
                vendor_name : "",
                product_name : "",
                icon : "",
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

        var modules = this.state.mission_complier_module.modules;
        var modules_enable = [];

        if (node.module_config) {
            modules = node.default_module;
            modules_enable = node.enable_module;
        }

        var test = {
            modules : modules,
            modules_enable : modules_enable,
            custom : this.state.mission_complier_module.custom,
            vendor_name : this.state.mission_complier_module.vendor_name,
            product_name : this.state.mission_complier_module.product_name,
            icon : this.state.mission_complier_module.icon,
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
                modules : modules,
                modules_enable : modules_enable,
                custom : this.state.mission_complier_module.custom,
                vendor_name : this.state.mission_complier_module.vendor_name,
                product_name : this.state.mission_complier_module.product_name,
                icon : this.state.mission_complier_module.icon,
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
                modules : values.modules,
                modules_enable : this.state.mission_complier_module.modules_enable,
                custom : values.custom,
                vendor_name : values.vendor_name,
                product_name : values.product_name,
                icon : values.icon,
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
                    software="weixunclient"
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
                    modules: Form.createFormField({
                        value: props.mission_complier_module.modules,
                    }),
                    custom: Form.createFormField({
                        value: props.mission_complier_module.custom,
                    }),
                    vendor_name: Form.createFormField({
                        value: props.mission_complier_module.vendor_name,
                    }),
                    product_name: Form.createFormField({
                        value: props.mission_complier_module.product_name,
                    }),
                    icon: Form.createFormField({
                        value: props.mission_complier_module.icon,
                    }),
                    readme: Form.createFormField({
                        value: props.mission_complier_module.readme,
                    }),
                };
           }
           })(WeixunClientComplierModuleFormTemplate);

        return (
            <div className="mission_layout">
                <ComplierModuleForm 
                    software="weixunclient"
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
                <WeixunClientMissionCheckContent 
                    software="weixunclient"
                    complier_option={this.state.mission_complier_option}
                    complier_module={this.state.mission_complier_module}
                    onSubmit={this.onComplierCheckSubmit.bind(this)}
                    OnBackClick={this.OnBackClick.bind(this)}
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