[
    {
        "name" : "sep",
        "platform" : [
            {
                "name" : "Windows",
                "description" : "Windows平台",
                "codepath" : "D:\\code\\SEP4\\",
                "script" : "F:\\output\\tmp\\automake.bat",
                "protocol_change" : true,
                "enable_protocol" : ["0", "1", "2", "3", "4"],
                "default_protocol" : ["0", "1", "2", "3"],
                "module_change" : true,
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
                                "protocol_change" : true,
                                "enable_protocol" : [],
                                "default_protocol" : ["0", "1", "2", "3", "4"],
                                "module_change" : true,
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
                                "protocol_change" : true,
                                "enable_protocol" : [],
                                "default_protocol" : ["0", "1", "2", "3", "4"],
                                "module_change" : true,
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
                                "server_address" : "192.168.12.182",
                                "username" : "centerm",
                                "password" : "centerm",
                                "codepath" : "/home/centerm/weilc/SEP4/sep4/mika",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-C91",
                                "protocol_change" : true,
                                "enable_protocol" : [],
                                "default_protocol" : ["0", "1", "2", "3", "4"],
                                "module_change" : true,
                                "enable_module" : ["0", "6"],
                                "default_module" : ["0", "1", "6", "9"]
                            },
                            {
                                "name" : "C15",
                                "description" : "C15代机型",
                                "server_address" : "192.168.12.182",
                                "username" : "centerm",
                                "password" : "centerm",
                                "codepath" : "/home/centerm/weilc/SEP4/sep4/mika",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-C15",
                                "protocol_change" : true,
                                "enable_protocol" : [],
                                "default_protocol" : ["0", "1", "2", "3", "4"],
                                "module_change" : true,
                                "enable_module" : ["0", "6"],
                                "default_module" : ["0", "1", "6", "7", "9"]
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
                "script" : "F:\\output\\tmp\\automake_Ivy.bat"
            },
            {
                "name" : "Linux",
                "description" : "Linux平台",
                "script" : "F:\\output\\tmp\\automake_linux.bat",
                "archs" : [
                    {
                        "name" : "x86",
                        "description" : "x86 32位指令集",
                        "os" : [
                            {
                                "name" : "cos",
                                "description" : "COS操作系统",
                                "server_address" : "192.168.12.124",
                                "username" : "centerm",
                                "password" : "centerm123!@#",
                                "codepath" : "/home/centerm/project/lichangke/Pikachu/Pikachu",
                                "param" : ""
                            },
                            {
                                "name" : "C72",
                                "description" : "C72机型",
                                "server_address" : "192.168.12.124",
                                "username" : "centerm",
                                "password" : "centerm123!@#",
                                "codepath" : "/home/centerm/project/lichangke/Pikachu/Pikachu",
                                "param" : "-PKUNITY"
                            }
                        ]
                    },
                    {
                        "name" : "arm",
                        "description" : "Arm 32位指令集",
                        "os" : [
                            {
                                "name" : "C91",
                                "description" : "C91 2代机型 COS操作系统",
                                "server_address" : "192.168.12.182",
                                "username" : "centerm",
                                "password" : "centerm",
                                "codepath" : "/home/centerm/lichangke/Pikachu/Pikachu",
                                "param" : "-C91"
                            },
                            {
                                "name" : "C15",
                                "description" : "C15机型 COS操作系统",
                                "server_address" : "192.168.12.182",
                                "username" : "centerm",
                                "password" : "centerm",
                                "codepath" : "/home/centerm/lichangke/Pikachu/Pikachu",
                                "param" : "-C10V3"
                            },
                            {
                                "name" : "Android",
                                "description" : "Android操作系统",
                                "server_address" : "192.168.12.124",
                                "username" : "centerm",
                                "password" : "centerm123!@#",
                                "codepath" : "/home/centerm/lichangke/Pikachu/Pikachu",
                                "param" : "-ANDROID_ARM"
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
                "script" : "F:\\output\\tmp\\automake_IVY_SEP.bat"
            }
        ]
    }
]