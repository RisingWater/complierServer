[
    {
        "name" : "sep",
        "platform" : [
            {
                "name" : "Windows",
                "description" : "Windows平台",
                "codepath" : "D:\\code\\SEP4\\",
                "script" : "F:\\output\\tmp\\automake.bat",
                "protocol_config" : true,
                "enable_protocol" : ["0", "1", "2", "3", "4"],
                "default_protocol" : ["0", "1", "2", "3"],
                "module_config" : true,
                "enable_module" : ["0", "1", "2", "4", "6", "7", "8"],
                "default_module" : ["0", "1", "2", "4", "6", "7", "8", "9"]
            },
            {
                "name" : "Linux",
                "description" : "Linux平台",
                "children" : [
                    {
                        "name" : "x86",
                        "description" : "x86 32位指令集",
                        "children" : [
                            {
                                "name" : "cos",
                                "description" : "COS操作系统",
                                "server_address" : "192.168.12.124",
                                "username" : "centerm",
                                "password" : "centerm123!@#",
                                "codepath" : "/home/centerm/project/autobuild/sep4/mika",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "",
                                "protocol_config" : true,
                                "enable_protocol" : [],
                                "default_protocol" : ["0", "1", "2", "3", "4"],
                                "module_config" : true,
                                "enable_module" : ["0", "1", "2", "4", "6", "7"],
                                "default_module" : ["0", "1", "2", "4", "6", "7", "9"]
                            },
                            {
                                "name" : "C72",
                                "description" : "C72机型",
                                "server_address" : "192.168.12.124",
                                "username" : "centerm",
                                "password" : "centerm123!@#",
                                "codepath" : "/home/centerm/project/autobuild/sep4/mika",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "",
                                "protocol_config" : true,
                                "enable_protocol" : [],
                                "default_protocol" : ["0", "1", "2", "3", "4"],
                                "module_config" : true,
                                "enable_module" : ["0", "6"],
                                "default_module" : ["0", "6", "9"]
                            }
                        ]
                    },
                    {
                        "name" : "armv7",
                        "description" : "Arm 32位指令集",
                        "children" : [
                            {
                                "name" : "C91",
                                "description" : "C91 2代机型",
                                "server_address" : "192.168.12.200",
                                "username" : "lichangke",
                                "password" : "centerm",
                                "codepath" : "/home/lichangke/developing/sep4/sep4/mika",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-C91",
                                "protocol_config" : true,
                                "enable_protocol" : [],
                                "default_protocol" : ["0", "1", "2", "3", "4"],
                                "module_config" : true,
                                "enable_module" : ["0", "6"],
                                "default_module" : ["0", "1", "6", "9"]
                            },
                            {
                                "name" : "C15",
                                "description" : "C15代机型",
                                "server_address" : "192.168.12.200",
                                "username" : "lichangke",
                                "password" : "centerm",
                                "codepath" : "/home/lichangke/developing/sep4_C15/sep4/mika",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-C15",
                                "protocol_config" : true,
                                "enable_protocol" : [],
                                "default_protocol" : ["0", "1", "2", "3", "4"],
                                "module_config" : true,
                                "enable_module" : ["0", "6"],
                                "default_module" : ["0", "1", "6", "7", "9"]
                            }
                        ]
                    },
                    {
                        "name" : "aarch64",
                        "description" : "Arm 64位指令集",
                        "children" : [
                            {
                                "name" : "ubuntu16.04",
                                "description" : "Ubuntu 16.04",
                                "server_address" : "192.168.4.120",
                                "username" : "centerm",
                                "password" : "centerm",
                                "codepath" : "/home/centerm/sep4/mika",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-national -arch aarch64 -os ubuntu16.04",
                                "protocol_config" : true,
                                "enable_protocol" : [],
                                "default_protocol" : ["0", "1", "2", "3", "4"],
                                "module_config" : true,
                                "enable_module" : ["0", "1", "2", "4", "6", "7", "8"],
                                "default_module" : ["0", "2", "6", "7", "8", "9"]
                            }
                        ]
                    },
                    {
                        "name" : "mips64el",
                        "description" : "MIPS 64位指令集",
                        "children" : [
                            {
                                "name" : "nd7.0",
                                "description" : "NeoKylin Desktop 7.0",
                                "server_address" : "192.168.4.119",
                                "username" : "centerm",
                                "password" : "1",
                                "codepath" : "/home/centerm/sep4/mika",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-national -arch mips64el -os nd7.0",
                                "protocol_config" : true,
                                "enable_protocol" : [],
                                "default_protocol" : ["0", "1", "2", "3", "4"],
                                "module_config" : true,
                                "enable_module" : ["0", "1", "2", "4", "6", "7", "8"],
                                "default_module" : ["0", "2", "6", "7", "8", "9"]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "name" : "weixunclient",
        "platform" : [
            {
                "name" : "Windows",
                "description" : "Windows平台",
                "codepath" : "D:\\code\\Pikachu\\",
                "script" : "F:\\output\\tmp\\automake_Ivy.bat",
                "protocol_config" : false,
                "module_config" : true,
                "enable_module" : [],
                "default_module" : ["0", "1"]
            },
            {
                "name" : "Linux",
                "description" : "Linux平台",
                "children" : [
                    {
                        "name" : "x86",
                        "description" : "x86 32位指令集",
                        "children" : [
                            {
                                "name" : "cos",
                                "description" : "COS操作系统",
                                "server_address" : "192.168.12.124",
                                "username" : "centerm",
                                "password" : "centerm123!@#",
                                "codepath" : "/home/centerm/project/lichangke/Pikachu/Pikachu",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "",
                                "protocol_config" : false,
                                "module_config" : true,
                                "enable_module" : [],
                                "default_module" : ["1"]
                            },
                            {
                                "name" : "C72",
                                "description" : "C72机型",
                                "server_address" : "192.168.12.124",
                                "username" : "centerm",
                                "password" : "centerm123!@#",
                                "codepath" : "/home/centerm/project/lichangke/Pikachu/Pikachu",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-PKUNITY",
                                "protocol_config" : false,
                                "module_config" : true,
                                "enable_module" : [],
                                "default_module" : ["1"]
                            }
                        ]
                    },
                    {
                        "name" : "arm",
                        "description" : "Arm 32位指令集",
                        "children" : [
                            {
                                "name" : "C91",
                                "description" : "C91 2代机型 COS操作系统",
                                "server_address" : "192.168.12.200",
                                "username" : "lichangke",
                                "password" : "centerm",
                                "codepath" : "/home/lichangke/developing/Pikachu/Pikachu",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-C91",
                                "protocol_config" : false,
                                "module_config" : true,
                                "enable_module" : [],
                                "default_module" : ["1"]
                            },
                            {
                                "name" : "C15",
                                "description" : "C15机型 COS操作系统",
                                "server_address" : "192.168.12.200",
                                "username" : "lichangke",
                                "password" : "centerm",
                                "codepath" : "/home/lichangke/developing/Pikachu_C15/Pikachu",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-C10V3",
                                "protocol_config" : false,
                                "module_config" : true,
                                "enable_module" : [],
                                "default_module" : ["1"]
                            }
                        ]
                    },
                    {
                        "name" : "x86_64",
                        "description" : "x86 64位指令集",
                        "children" : [
                            {
                                "name" : "nd7.0",
                                "description" : "NeoKylin Desktop 7.0",
                                "server_address" : "192.168.12.135",
                                "username" : "centerm",
                                "password" : "centerm",
                                "codepath" : "/project/Pikachu",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-national -arch x86_64 -os nd7.0",
                                "protocol_config" : false,
                                "module_config" : true,
                                "enable_module" : ["0", "1"],
                                "default_module" : []
                            }
                        ]
                    },
                    {
                        "name" : "aarch64",
                        "description" : "Arm 64位指令集",
                        "children" : [
                            {
                                "name" : "ubuntu16.04",
                                "description" : "Ubuntu 16.04",
                                "server_address" : "192.168.4.120",
                                "username" : "centerm",
                                "password" : "centerm",
                                "codepath" : "/home/centerm/Pikachu",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-national -arch aarch64 -os ubuntu16.04",
                                "protocol_config" : false,
                                "module_config" : true,
                                "enable_module" : [],
                                "default_module" : ["1"]
                            },
                            {
                                "name" : "ns7.0",
                                "description" : "NeoKylin Server 7.0",
                                "server_address" : "192.168.127.234",
                                "username" : "centerm",
                                "password" : "centerm",
                                "codepath" : "/home/centerm/Pikachu",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-national -arch aarch64 -os ns7.0",
                                "protocol_config" : false,
                                "module_config" : true,
                                "enable_module" : [],
                                "default_module" : ["0"]
                            },
                            {
                                "name" : "nd7.0",
                                "description" : "NeoKylin Desktop 7.0",
                                "server_address" : "192.168.127.234",
                                "username" : "centerm",
                                "password" : "centerm",
                                "codepath" : "/home/centerm/Pikachu",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-national -arch aarch64 -os nd7.0",
                                "protocol_config" : false,
                                "module_config" : true,
                                "enable_module" : [],
                                "default_module" : ["0"]
                            }
                        ]
                    },
                    {
                        "name" : "mips64el",
                        "description" : "MIPS 64位指令集",
                        "children" : [
                            {
                                "name" : "nd7.0",
                                "description" : "NeoKylin Desktop 7.0",
                                "server_address" : "192.168.4.119",
                                "username" : "centerm",
                                "password" : "1",
                                "codepath" : "/home/centerm/Pikachu",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-national -arch mips64el -os nd7.0",
                                "protocol_config" : false,
                                "module_config" : true,
                                "enable_module" : [],
                                "default_module" : ["1"]
                            }
                        ]
                    }
                ]
            },
            {
                "name" : "Android",
                "description" : "Android平台",
                "children" : [
                    {
                        "name" : "arm",
                        "description" : "Arm 32位指令集",
                        "children" : [
                            {
                                "name" : "Android",
                                "description" : "Android操作系统",
                                "server_address" : "192.168.12.124",
                                "username" : "centerm",
                                "password" : "centerm123!@#",
                                "codepath" : "/home/centerm/project/lichangke/Pikachu/Pikachu",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-Android_ARM",
                                "protocol_config" : false,
                                "module_config" : true,
                                "enable_module" : [],
                                "default_module" : ["1"]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "name" : "IVY&SEP",
        "platform" : [
            {
                "name" : "Windows",
                "description" : "Windows平台",
                "codepath" : "",
                "script" : "F:\\output\\tmp\\automake_IVY_SEP.bat",
                "protocol_config" : true,
                "enable_protocol" : [],
                "default_protocol" : ["2", "3"],
                "module_config" : true,
                "enable_module" : ["0", "1", "2", "4", "6", "7", "8"],
                "default_module" : ["0", "1", "2", "4", "6", "7", "8", "9"]
            }
        ]
    }
]