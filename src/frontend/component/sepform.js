import React from 'react';
import 'antd/dist/antd.css';
import { Steps, Layout, Form } from 'antd';
import { ComplierOptionFormTemplate } from './complierOption.js'
import { SEPComplierModuleFormTemplate } from './sepComplierModule.js'
import { SEPMissionCheckContent } from './sepMissionCheck.js'
import { OEMOptionFormTemplate } from './oemOption.js'

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
                    title: '定制OEM参数',
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
                packages : [],
                packages_enable : [],
                license_option : 0,
                readme : ""
            },

            mission_oem_option : {
                oem_enable : false,
                oemid : "",
                vendor_name : "",
                product_name : "",
                copyright : "",
                icon : "",
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
        var packages = this.state.mission_complier_module.packages;
        var packages_enable = [];

        if (node.protocol_config) {
            protocols = node.default_protocol;
            protocols_enable = node.enable_protocol;
        }

        if (node.module_config) {
            modules = node.default_module;
            modules_enable = node.enable_module;
        }

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
                protocols : protocols,
                protocols_enable : protocols_enable,
                modules : modules,
                modules_enable : modules_enable,
                packages : packages,
                packages_enable : packages_enable,
                license_option : this.state.mission_complier_module.license_option,
                readme :  this.state.mission_complier_module.readme,
            }
        })

        const current = this.state.currentStep + 1;
        this.setState({ currentStep : current });
    }

    onComplierModuleSubmit(values) {
        console.log('Received values of complier module form: ', values);

        var package_array = new Array();
        if (!Array.isArray(values.packages)) {
            var value = values.packages;
            package_array.push(value);
        } else {
            package_array = values.packages;
        }

        this.setState( { 
            mission_complier_module : {
                protocols : values.protocols,
                protocols_enable : this.state.mission_complier_module.protocols_enable,
                modules : values.modules,
                modules_enable : this.state.mission_complier_module.modules_enable,
                packages : package_array,
                packages_enable : this.state.mission_complier_module.packages_enable,
                license_option : values.license_option,
				license_time : values.license_time,
                readme : values.readme,
            }
        })

        const current = this.state.currentStep + 1;
        this.setState({ currentStep : current });
    }

    onOEMOptionSubmit(values, oemid, icon) {
        console.log('Received values of oem option form: ', values);

        this.setState( { 
            mission_oem_option : {
                oem_enable : values.oem_enable,
                oemid : oemid,
                vendor_name : values.vendor_name,
                product_name : values.product_name,
                copyright : values.copyright,
                icon : icon,
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

    saveOEMOptionFormRef(formRef) {
        this.oemOptionFormRef = formRef;
    };

    ComplierOptionFormChange(allFields) {

    };

    ComplierModuleFormChange(allFields) {

    };

    OEMOptionFormChange(allFields) {

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
                    software="sep"
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
                    protocols: Form.createFormField({
                        value: props.mission_complier_module.protocols,
                    }),
                    modules: Form.createFormField({
                        value: props.mission_complier_module.modules,
                    }),
                    packages: Form.createFormField({
                        value: props.mission_complier_module.packages,
                    }),
                    license_option: Form.createFormField({
                        value: props.mission_complier_module.license_option,
                    }),
					license_time: Form.createFormField({
                        value: props.mission_complier_module.license_time,
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

    OEMOptionContent() {
        const OEMOptionForm = Form.create({
            name: 'OEMOption',
            onFieldsChange : (props, changedFields, allFields) => {
               props.onChange(allFields);
            },

            mapPropsToFields: (props) => {
                return {
                    oem_enable: Form.createFormField({
                        value: props.mission_oem_option.oem_enable,
                    }),
                    vendor_name: Form.createFormField({
                        value: props.mission_oem_option.vendor_name,
                    }),
                    product_name: Form.createFormField({
                        value: props.mission_oem_option.product_name,
                    }),
                    copyright: Form.createFormField({
                        value: props.mission_oem_option.copyright,
                    }),
                };
           }
        })(OEMOptionFormTemplate);

        return (
            <div className="mission_layout">
                <OEMOptionForm 
                    mission_oem_option={this.state.mission_oem_option}
                    onChange={this.OEMOptionFormChange.bind(this)}
                    wrappedComponentRef={this.saveOEMOptionFormRef.bind(this)}
                    onSubmit={this.onOEMOptionSubmit.bind(this)}
                    OnBackClick={this.OnBackClick.bind(this)}/>
            </div>
        );
    }

    missionCheckContent() {
        return (
            <div className="mission_layout">
                <SEPMissionCheckContent 
                    software="sep"
                    complier_option={this.state.mission_complier_option}
                    complier_module={this.state.mission_complier_module}
                    oem_option={this.state.mission_oem_option}
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
            return this.OEMOptionContent();
        } else if (this.state.currentStep == 3) {
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