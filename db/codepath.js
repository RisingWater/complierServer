[
    {
        "name" : "sep",
        "platform" : [
            {
                "name" : "Windows",
                "description" : "Windows操作系统",
                "codepath" : "D:\\code\\SEP4\\",
                "script" : "F:\\output\\tmp\\automake.bat",
                "protocol_config" : true,
                "enable_protocol" : ["0", "1", "2", "3", "4"],
                "default_protocol" : ["0", "1", "2", "3"],
                "module_config" : true,
                "enable_module" : ["0", "1", "2", "4", "6", "7", "8"],
                "default_module" : ["0", "1", "2", "4", "6", "7", "8", "9"],
                "packages_config" : true,
                "enable_packages" : [],
                "default_packages" : ["0", "1"]
            },
            {
                "name" : "Linux",
                "description" : "Linux操作系统",
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
                                "default_module" : ["0", "1", "2", "4", "6", "7", "9"],
                                "packages_config" : true,
                                "enable_packages" : [],
                                "default_packages" : ["1"]
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
                                "default_module" : ["0", "6", "9"],
                                "packages_config" : true,
                                "enable_packages" : [],
                                "default_packages" : ["1"]
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
                                "default_module" : ["0", "1", "6", "9"],
                                "packages_config" : true,
                                "enable_packages" : [],
                                "default_packages" : ["1"]
                            },
                            {
                                "name" : "C15",
                                "description" : "C15机型",
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
                                "default_module" : ["0", "1", "6", "7", "9"],
                                "packages_config" : true,
                                "enable_packages" : [],
                                "default_packages" : ["1"]
                            }
                        ]
                    },
                    {
                        "name" : "x86_64",
                        "description" : "x86 64位指令集",
                        "children" : [
							{
                                "name" : "cos",
                                "description" : "COS操作系统(ubuntu 18.04)",
                                "server_address" : "192.168.12.200",
                                "username" : "wangxu",
                                "password" : "centerm",
                                "codepath" : "/home/wangxu/workdir/sep4/mika",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-Gstreamer1 -X86_64 -arch x86_64 -os cos",
                                "protocol_config" : true,
                                "enable_protocol" : [],
                                "default_protocol" : ["0", "1", "2", "3", "4"],
                                "module_config" : true,
                                "enable_module" : ["0", "1", "2", "4", "6", "7", "8"],
                                "default_module" : ["0", "2", "6", "7", "8", "9"],
                                "packages_config" : true,
                                "enable_packages" : ["0", "1"],
                                "default_packages" : []
                            },
							{
                                "name" : "ubuntu18.04",
                                "description" : "ubuntu 18.04/UOS 20/深度 15.x",
                                "server_address" : "192.168.12.200",
                                "username" : "wangxu",
                                "password" : "centerm",
                                "codepath" : "/home/wangxu/workdir/sep4/mika",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-Gstreamer1 -national -arch x86_64 -os ubuntu18.04",
                                "protocol_config" : true,
                                "enable_protocol" : [],
                                "default_protocol" : ["0", "1", "2", "3", "4"],
                                "module_config" : true,
                                "enable_module" : ["0", "1", "2", "4", "6", "7", "8"],
                                "default_module" : ["0", "2", "6", "7", "8", "9"],
                                "packages_config" : true,
                                "enable_packages" : ["0", "1"],
                                "default_packages" : []
                            },
                            {
                                "name" : "nd7.0",
                                "description" : "中标麒麟 7.x",
                                "server_address" : "192.168.12.135",
                                "username" : "centerm",
                                "password" : "centerm",
                                "codepath" : "/projects/sep4/mika",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-national -arch x86_64 -os nd7.0",
                                "protocol_config" : true,
                                "enable_protocol" : [],
                                "default_protocol" : ["0", "1", "2", "3", "4"],
                                "module_config" : true,
                                "enable_module" : ["0", "1", "2", "4", "6", "7", "8"],
                                "default_module" : ["0", "2", "6", "7", "8", "9"],
                                "packages_config" : true,
                                "enable_packages" : ["0", "1"],
                                "default_packages" : []
                            }
                        ]
                    },
                    {
                        "name" : "aarch64",
                        "description" : "Arm 64位指令集",
                        "children" : [
                            {
                                "name" : "ubuntu16.04",
                                "description" : "Ubuntu 16.04/银河麒麟 4.x",
                                "server_address" : "192.168.12.200",
                                "username" : "wangxu",
                                "password" : "centerm",
                                "codepath" : "/home/wangxu/workdir/chroot_aarch64_ubuntu16.04/home/wangxu/sep4/mika",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-national -arch aarch64 -os ubuntu16.04 -rootdir /home/wangxu/workdir/chroot_aarch64_ubuntu16.04 -codedir /home/wangxu/sep4/mika",
                                "protocol_config" : true,
                                "enable_protocol" : [],
                                "default_protocol" : ["0", "1", "2", "3", "4"],
                                "module_config" : true,
                                "enable_module" : ["0", "1", "2", "4", "6", "7", "8"],
                                "default_module" : ["0", "2", "6", "7", "8", "9"],
                                "packages_config" : true,
                                "enable_packages" : ["0", "1"],
                                "default_packages" : []
                            },
                            {
                                "name" : "ubuntu18.04",
                                "description" : "ubuntu 18.04/UOS 20/深度 15.x",
                                "server_address" : "192.168.12.200",
                                "username" : "wangxu",
                                "password" : "centerm",
                                "codepath" : "/home/wangxu/workdir/chroot_aarch64_ubuntu18.04/home/wangxu/sep4/mika",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-national -arch aarch64 -os ubuntu18.04 -rootdir /home/wangxu/workdir/chroot_aarch64_ubuntu18.04 -codedir /home/wangxu/sep4/mika",
                                "protocol_config" : true,
                                "enable_protocol" : [],
                                "default_protocol" : ["0", "1", "2", "3", "4"],
                                "module_config" : true,
                                "enable_module" : ["0", "1", "2", "4", "6", "7", "8"],
                                "default_module" : ["0", "2", "6", "7", "8", "9"],
                                "packages_config" : true,
                                "enable_packages" : ["0", "1"],
                                "default_packages" : []
                            },							
                            {
                                "name" : "nd7.0",
                                "description" : "中标麒麟 7.x",
                                "server_address" : "10.17.15.234",
                                "username" : "centerm",
                                "password" : "centerm",
                                "codepath" : "/home/centerm/sep4/mika",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-national -arch aarch64 -os nd7.0",
                                "protocol_config" : true,
                                "enable_protocol" : [],
                                "default_protocol" : ["0", "1", "2", "3", "4"],
                                "module_config" : true,
                                "enable_module" : ["0", "1", "2", "4", "6", "7", "8"],
                                "default_module" : ["0", "2", "6", "7", "8", "9"],
                                "packages_config" : true,
                                "enable_packages" : [],
                                "default_packages" : ["0"]
                            }
                        ]
                    },
                    {
                        "name" : "mips64el",
                        "description" : "MIPS 64位指令集",
                        "children" : [
                            {
                                "name" : "nd7.0",
                                "description" : "中标麒麟 7.x",
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
                                "default_module" : ["0", "2", "6", "7", "8", "9"],
                                "packages_config" : true,
                                "enable_packages" : [],
                                "default_packages" : ["1"]
                            },
							{
                                "name" : "ubuntu18.04",
                                "description" : "Debian 9/银河麒麟 4.x/银河麒麟 10.x",
                                "server_address" : "192.168.12.200",
                                "username" : "wangxu",
                                "password" : "centerm",
                                "codepath" : "/home/wangxu/workdir/debian9_mips64el/home/wangxu/SEP/mika",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-national -arch mips64el -os ubuntu16.04 -rootdir /home/wangxu/workdir/debian9_mips64el -codedir /home/wangxu/SEP/mika",
                                "protocol_config" : true,
                                "enable_protocol" : [],
                                "default_protocol" : ["0", "1", "2", "3", "4"],
                                "module_config" : true,
                                "enable_module" : ["0", "1", "2", "4", "6", "7", "8"],
                                "default_module" : ["0", "6", "7", "8", "9"],
                                "packages_config" : true,
                                "enable_packages" : [],
                                "default_packages" : ["1"]
                            },
							{
                                "name" : "ubuntu18.04",
                                "description" : "Debian 10/UOS 20/深度 15.x",
                                "server_address" : "192.168.12.200",
                                "username" : "wangxu",
                                "password" : "centerm",
                                "codepath" : "/home/wangxu/workdir/debian10_mips64el/home/wangxu/SEP/mika",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-national -arch mips64el -os ubuntu18.04 -rootdir /home/wangxu/workdir/debian10_mips64el -codedir /home/wangxu/SEP/mika",
                                "protocol_config" : true,
                                "enable_protocol" : [],
                                "default_protocol" : ["0", "1", "2", "3", "4"],
                                "module_config" : true,
                                "enable_module" : ["0", "1", "2", "4", "6", "7", "8"],
                                "default_module" : ["0", "6", "7", "8", "9"],
                                "packages_config" : true,
                                "enable_packages" : [],
                                "default_packages" : ["1"]
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
                "description" : "Windows操作系统",
                "codepath" : "D:\\code\\Pikachu\\",
                "script" : "F:\\output\\tmp\\automake_Ivy.bat",
                "protocol_config" : false,
                "packages_config" : true,
                "enable_packages" : [],
                "default_packages" : ["0", "1"]
            },
            {
                "name" : "Linux",
                "description" : "Linux操作系统",
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
                                "packages_config" : true,
                                "enable_packages" : [],
                                "default_packages" : ["1"]
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
                                "packages_config" : true,
                                "enable_packages" : [],
                                "default_packages" : ["1"]
                            }
                        ]
                    },
                    {
                        "name" : "arm",
                        "description" : "Arm 32位指令集",
                        "children" : [
                            {
                                "name" : "C91",
                                "description" : "C91 2代机型",
                                "server_address" : "192.168.12.200",
                                "username" : "lichangke",
                                "password" : "centerm",
                                "codepath" : "/home/lichangke/developing/Pikachu/Pikachu",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-C91",
                                "protocol_config" : false,
                                "packages_config" : true,
                                "enable_packages" : [],
                                "default_packages" : ["1"]
                            },
                            {
                                "name" : "C15",
                                "description" : "C15机型",
                                "server_address" : "192.168.12.200",
                                "username" : "lichangke",
                                "password" : "centerm",
                                "codepath" : "/home/lichangke/developing/Pikachu_C15/Pikachu",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-C10V3",
                                "protocol_config" : false,
                                "packages_config" : true,
                                "enable_packages" : [],
                                "default_packages" : ["1"]
                            }
                        ]
                    },
                    {
                        "name" : "x86_64",
                        "description" : "x86 64位指令集",
                        "children" : [
							{
                                "name" : "cos",
                                "description" : "COS操作系统(Ubuntu 18.04)",
                                "server_address" : "192.168.12.200",
                                "username" : "wangxu",
                                "password" : "centerm",
                                "codepath" : "/home/wangxu/workdir/Pikachu",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-arch x86_64 -os cos",
                                "protocol_config" : false,
                                "packages_config" : true,
                                "enable_packages" : ["0", "1"],
                                "default_packages" : []
                            },
							{
                                "name" : "ubuntu18.04",
                                "description" : "ubuntu 18.04/UOS 20/深度 15.x",
                                "server_address" : "192.168.12.200",
                                "username" : "wangxu",
                                "password" : "centerm",
                                "codepath" : "/home/wangxu/workdir/Pikachu",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-national -arch x86_64 -os ubuntu18.04",
                                "protocol_config" : false,
                                "packages_config" : true,
                                "enable_packages" : ["0", "1"],
                                "default_packages" : []
                            },
                            {
                                "name" : "nd7.0",
                                "description" : "中标麒麟 7.x",
                                "server_address" : "192.168.12.135",
                                "username" : "centerm",
                                "password" : "centerm",
                                "codepath" : "/projects/Pikachu",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-national -arch x86_64 -os nd7.0",
                                "protocol_config" : false,
                                "packages_config" : true,
                                "enable_packages" : ["0", "1"],
                                "default_packages" : []
                            }
                        ]
                    },
                    {
                        "name" : "aarch64",
                        "description" : "Arm 64位指令集",
                        "children" : [
                            {
                                "name" : "ubuntu16.04",
                                "description" : "Ubuntu 16.04/银河麒麟 4.x/银河麒麟 10.x",
                                "server_address" : "192.168.12.200",
                                "username" : "wangxu",
                                "password" : "centerm",
                                "codepath" : "/home/wangxu/workdir/chroot_aarch64_ubuntu16.04/home/wangxu/Pikachu",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-national -arch aarch64 -os ubuntu16.04 -rootdir /home/wangxu/workdir/chroot_aarch64_ubuntu16.04 -codedir /home/wangxu/Pikachu",
                                "protocol_config" : false,
                                "packages_config" : true,
                                "enable_packages" : ["0", "1"],
                                "default_packages" : []
                            },
							{
                                "name" : "ubuntu18.04",
                                "description" : "ubuntu 18.04/UOS 20/深度 15.x",
                                "server_address" : "192.168.12.200",
                                "username" : "wangxu",
                                "password" : "centerm",
                                "codepath" : "/home/wangxu/workdir/chroot_aarch64_ubuntu18.04/home/wangxu/Pikachu",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-national -arch aarch64 -os ubuntu18.04 -rootdir /home/wangxu/workdir/chroot_aarch64_ubuntu18.04 -codedir /home/wangxu/Pikachu",
                                "protocol_config" : false,
                                "packages_config" : true,
                                "enable_packages" : ["0", "1"],
                                "default_packages" : []
                            },
                            {
                                "name" : "nd7.0",
                                "description" : "中标麒麟 7.x",
                                "server_address" : "10.17.15.234",
                                "username" : "centerm",
                                "password" : "centerm",
                                "codepath" : "/home/centerm/Pikachu",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-national -arch aarch64 -os nd7.0",
                                "protocol_config" : false,
                                "packages_config" : true,
                                "enable_packages" : [],
                                "default_packages" : ["0"]
                            }
                        ]
                    },
                    {
                        "name" : "mips64el",
                        "description" : "MIPS 64位指令集",
                        "children" : [
                            {
                                "name" : "nd7.0",
                                "description" : "中标麒麟 7.x",
                                "server_address" : "192.168.4.119",
                                "username" : "centerm",
                                "password" : "1",
                                "codepath" : "/home/centerm/Pikachu",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-national -arch mips64el -os nd7.0",
                                "protocol_config" : false,
                                "packages_config" : true,
                                "enable_packages" : [],
                                "default_packages" : ["1"]
                            },
							{
                                "name" : "ubuntu18.04",
                                "description" : "Debian 9/银河麒麟 4.x/银河麒麟 10.x",
                                "server_address" : "192.168.12.200",
                                "username" : "wangxu",
                                "password" : "centerm",
                                "codepath" : "/home/wangxu/workdir/debian9_mips64el/home/wangxu/Pikachu",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-national -arch mips64el -os ubuntu16.04 -rootdir /home/wangxu/workdir/debian9_mips64el -codedir /home/wangxu/Pikachu",
                                "protocol_config" : false,
                                "packages_config" : true,
                                "enable_packages" : [],
                                "default_packages" : ["1"]
                            },
							{
                                "name" : "ubuntu18.04",
                                "description" : "Debian 10/UOS 20/深度 15.x",
                                "server_address" : "192.168.12.200",
                                "username" : "wangxu",
                                "password" : "centerm",
                                "codepath" : "/home/wangxu/workdir/debian10_mips64el/home/wangxu/Pikachu",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-national -arch mips64el -os ubuntu18.04 -rootdir /home/wangxu/workdir/debian10_mips64el -codedir /home/wangxu/Pikachu",
                                "protocol_config" : false,
                                "packages_config" : true,
                                "enable_packages" : [],
                                "default_packages" : ["1"]
                            }
                        ]
                    }
                ]
            },
            {
                "name" : "Android",
                "description" : "Android操作系统",
                "children" : [
                    {
                        "name" : "arm",
                        "description" : "Arm 32位指令集",
                        "children" : [
                            {
                                "name" : "Android",
                                "description" : "Android˛Ů×÷ĎľÍł",
                                "server_address" : "192.168.12.124",
                                "username" : "centerm",
                                "password" : "centerm123!@#",
                                "codepath" : "/home/centerm/project/lichangke/Pikachu/Pikachu",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-Android_ARM",
                                "protocol_config" : false,
                                "packages_config" : true,
                                "enable_packages" : [],
                                "default_packages" : ["1"]
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
                "description" : "Windows操作系统",
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
    },
    {
        "name" : "aksuit",
        "platform" : [
            {
                "name" : "Linux",
                "description" : "Linux操作系统",
                "children" : [
                    {
                        "name" : "x86_64",
                        "description" : "x86 64位指令集",
                        "children" : [
							{
                                "name" : "uos20",
                                "description" : "UOS 20",
                                "server_address" : "192.168.12.200",
                                "username" : "wangxu",
                                "password" : "centerm",
                                "codepath" : "/home/wangxu/workdir/Sekiro",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-national -arch x86_64 -os uos20",
                                "protocol_config" : false,
                                "packages_config" : true,
                                "enable_packages" : ["0", "1"],
                                "default_packages" : []
                            }
                        ]
                    },
                    {
                        "name" : "aarch64",
                        "description" : "Arm 64位指令集",
                        "children" : [
                            {
                                "name" : "kylin4.0",
                                "description" : "银河麒麟 4.x/银河麒麟 10.x",
                                "server_address" : "192.168.12.200",
                                "username" : "wangxu",
                                "password" : "centerm",
                                "codepath" : "/home/wangxu/workdir/chroot_aarch64_ubuntu16.04/home/wangxu/Sekiro",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-national -arch aarch64 -os kylin4.0 -rootdir /home/wangxu/workdir/chroot_aarch64_ubuntu16.04 -codedir /home/wangxu/Sekiro",
                                "protocol_config" : false,
                                "packages_config" : true,
                                "enable_packages" : ["0", "1"],
                                "default_packages" : []
                            },
							{
                                "name" : "uos20",
                                "description" : "UOS 20",
                                "server_address" : "192.168.12.200",
                                "username" : "wangxu",
                                "password" : "centerm",
                                "codepath" : "/home/wangxu/workdir/chroot_aarch64_ubuntu18.04/home/wangxu/Sekiro",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-national -arch aarch64 -os uos20 -rootdir /home/wangxu/workdir/chroot_aarch64_ubuntu18.04 -codedir /home/wangxu/Sekiro",
                                "protocol_config" : false,
                                "packages_config" : true,
                                "enable_packages" : ["0", "1"],
                                "default_packages" : []
                            }
                        ]
                    },
                    {
                        "name" : "mips64el",
                        "description" : "MIPS 64位指令集",
                        "children" : [
                            {
                                "name" : "kylin4.0",
                                "description" : "银河麒麟 4.x/银河麒麟 10.x",
                                "server_address" : "192.168.12.200",
                                "username" : "wangxu",
                                "password" : "centerm",
                                "codepath" : "/home/wangxu/workdir/debian9_mips64el/home/wangxu/Sekiro",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-national -arch mips64el -os kylin4.0 -rootdir /home/wangxu/workdir/debian9_mips64el -codedir /home/wangxu/Sekiro",
                                "protocol_config" : false,
                                "packages_config" : true,
                                "enable_packages" : [],
                                "default_packages" : ["1"]
                            },
							{
                                "name" : "uos20",
                                "description" : "UOS 20",
                                "server_address" : "192.168.12.200",
                                "username" : "wangxu",
                                "password" : "centerm",
                                "codepath" : "/home/wangxu/workdir/debian10_mips64el/home/wangxu/Sekiro",
                                "script" : "F:\\output\\tmp\\automake_linux.bat",
                                "param" : "-national -arch mips64el -os uos20 -rootdir /home/wangxu/workdir/debian10_mips64el -codedir /home/wangxu/Sekiro",
                                "protocol_config" : false,
                                "packages_config" : true,
                                "enable_packages" : [],
                                "default_packages" : ["1"]
                            }
                        ]
                    }
                ]
            }
        ]
    }
]