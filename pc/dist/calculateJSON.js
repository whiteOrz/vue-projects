var json = {
        "subjectList": {
            "insurePerson":[
                "factor_insureChildBirth",
                "factor_insureChildGender",
                "factor_insureRelationship",
                "factor_insureLiability" ,
                "factor_insureGender"
            ],
            "insureLiability":[
                "factor_insurePayWay"
            ],
            "insurePayWay":[
                "factor_insurePayFrequency"
            ],
            "insureBirth&insureChildBirth":[
                "factor_insurePeriod",
                "factor_insurePayWay"
            ],
            "insureLiability&insurePerson":[
                "factor_insureBirth",
                "factor_insureRelationship"
            ],
            "iptArea&insureChildBirth&insureBirth":[
                "factor_insureSum"
            ]
        },
        "factorList":{
            "insureChildBirth":{
                "type": "input",
                "subjectList": {
                    "insurePerson": {
                        "01": {
                            "action": "hidden"
                        },
                        "40": {
                            "action": "visible"
                        }
                    }
                }
            },
            "insureChildGender":{
                "type": "input",
                "subjectList": {
                    "insurePerson": {
                        "01": {
                            "action": "hidden"
                        },
                        "40": {
                            "action": "visible"
                        }
                    }
                }
            },
            "insureGender":{
                "type": "input",
                "subjectList": {
                    "insurePerson": {
                        "01": {
                            "action": "visible"
                        },
                        "40": {
                            "action": "hidden"
                        }
                    }
                }
            } ,
            "insureRelationship":{
                "type": "input",
                "subjectList": {
                    "insurePerson": {
                        "01": {
                            "action": "hidden"
                        },
                        "40": {
                            "action": "visible"
                        }
                    },
                    "insureLiability":{
                        "2981,2982": {
                            "insurePerson":{
                                "01":{
                                    "action":"hidden"
                                },
                                "40":{
                                    "action":"hidden"
                                }
                            }
                        },
                        "2981,2982,2983": {
                            "insurePerson":{
                                "01":{
                                    "action":"hidden"
                                },
                                "40":{
                                    "action":"visible"
                                }
                            }
                        }
                    }
                }
            },
            "insureBirth":{
                "type": "input",
                "subjectList": {
                    "insurePerson": {
                        "01": {
                            "action": "visible"
                        },
                        "40": {
                            "insureLiability": {
                                "2981,2982": {
                                    "action": "hidden"
                                },
                                "2981,2982,2983": {
                                    "action": "visible"
                                }
                            }
                        }
                    },
                    "insureLiability": {
                        "2981,2982": {
                            "insurePerson":{
                                "01":{
                                    "action":"visible"
                                },
                                "40":{
                                    "action":"hidden"
                                }
                            }
                        },
                        "2981,2982,2983": {
                            "insurePerson":{
                                "01":{
                                    "action":"visible"
                                },
                                "40":{
                                    "action":"visible"
                                }
                            }
                        }
                    }
                }
            },
            "insurePayFrequency":{
                "type":"input",
                "subjectList": {
                    "insurePayWay": {
                        "SP": {
                            "action": "hidden"
                        },
                        "Y5": {
                            "action": "visible"
                        },
                        "Y10": {
                            "action": "visible"
                        },
                        "Y15": {
                            "action": "visible"
                        },
                        "Y20": {
                            "action": "visible"
                        }
                    }
                }

            },
            "insurePeriod":{
                "type": "input",
                "subjectList": {
                    "insureBirth": {
                        "0-40": {
                            "action": "setvalue",
                            "factorList":[
                                {
                                    "componentId": "insurePerios",
                                    "factorKey": "Y30",
                                    "factorValue": "30年"
                                },
                                {
                                    "componentId": "insurePerios",
                                    "factorKey": "A75",
                                    "factorValue": "75周岁"
                                }
                            ]
                        },
                        "40-55": {
                            "action": "setvalue",
                            "factorList":[
                                {
                                    "componentId": "insurePerios",
                                    "factorKey": "A75",
                                    "factorValue": "75周岁"
                                }
                            ]
                        },
                        "-1":{
                            "action": "visible",
                            "message":"年龄不在范围内"
                        }
                    },
                    "insureChildBirth": {
                        "0-40": {
                            "action": "setvalue",
                            "factorList":[
                                {
                                    "componentId": "insurePerios",
                                    "factorKey": "Y30",
                                    "factorValue": "30年"
                                },
                                {
                                    "componentId": "insurePerios",
                                    "factorKey": "A75",
                                    "factorValue": "75周岁"
                                }
                            ]
                        },
                        "40-55": {
                            "action": "setvalue",
                            "factorList":[
                                {
                                    "componentId": "insurePerios",
                                    "factorKey": "A75",
                                    "factorValue": "75周岁"
                                }
                            ]
                        },
                        "-1":{
                            "action": "visible",
                            "message":"年龄不在范围内"
                        }
                    }
                }
            },
            "insurePayWay":{
                "type": "input",
                "subjectList": {
                    "insureBirth": {
                        "0-35": {
                            "action": "setvalue",
                            "factorList":[
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "SP",
                                    "factorValue": "一次性交"
                                },
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "Y5",
                                    "factorValue": "5年交"
                                },
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "Y10",
                                    "factorValue": "10年交"
                                },
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "Y15",
                                    "factorValue": "15年交"
                                },
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "Y20",
                                    "factorValue": "20年交"
                                }
                            ]
                        },
                        "35-40": {
                            "action": "setvalue",
                            "factorList":[
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "SP",
                                    "factorValue": "一次性交"
                                },
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "Y5",
                                    "factorValue": "5年交"
                                },
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "Y10",
                                    "factorValue": "10年交"
                                },
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "Y15",
                                    "factorValue": "15年交"
                                }
                            ]
                        },
                        "40-45": {
                            "action": "setvalue",
                            "factorList":[
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "SP",
                                    "factorValue": "一次性交"
                                },
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "Y5",
                                    "factorValue": "5年交"
                                },
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "Y10",
                                    "factorValue": "10年交"
                                }
                            ]
                        },
                        "45-50": {
                            "action": "setvalue",
                            "factorList":[
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "SP",
                                    "factorValue": "一次性交"
                                },
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "Y5",
                                    "factorValue": "5年交"
                                }
                            ]
                        },
                        "50-55": {
                            "action": "setvalue",
                            "factorList":[
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "SP",
                                    "factorValue": "一次性交"
                                }
                            ]
                        },
                        "-1":{
                            "action": "visible",
                            "message":"年龄不在范围内"
                        }
                    },
                    "insureChildBirth": {
                        "0-35": {
                            "action": "setvalue",
                            "factorList":[
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "SP",
                                    "factorValue": "一次性交"
                                },
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "Y5",
                                    "factorValue": "5年交"
                                },
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "Y10",
                                    "factorValue": "10年交"
                                },
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "Y15",
                                    "factorValue": "15年交"
                                },
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "Y20",
                                    "factorValue": "20年交"
                                }
                            ]
                        },
                        "35-40": {
                            "action": "setvalue",
                            "factorList":[
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "SP",
                                    "factorValue": "一次性交"
                                },
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "Y5",
                                    "factorValue": "5年交"
                                },
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "Y10",
                                    "factorValue": "10年交"
                                },
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "Y15",
                                    "factorValue": "15年交"
                                }
                            ]
                        },
                        "40-45": {
                            "action": "setvalue",
                            "factorList":[
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "SP",
                                    "factorValue": "一次性交"
                                },
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "Y5",
                                    "factorValue": "5年交"
                                },
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "Y10",
                                    "factorValue": "10年交"
                                }
                            ]
                        },
                        "45-50": {
                            "action": "setvalue",
                            "factorList":[
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "SP",
                                    "factorValue": "一次性交"
                                },
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "Y5",
                                    "factorValue": "5年交"
                                }
                            ]
                        },
                        "50-55": {
                            "action": "setvalue",
                            "factorList":[
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "SP",
                                    "factorValue": "一次性交"
                                }
                            ]
                        },
                        "-1":{
                            "action": "visible",
                            "message":"年龄不在范围内"
                        }
                    },
                    "insureLiability":{
                        "2981,2982":{
                             "action": "setvalue",
                            "factorList":[
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "SP",
                                    "factorValue": "一次性交"
                                },
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "Y5",
                                    "factorValue": "5年交"
                                },
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "Y10",
                                    "factorValue": "10年交"
                                },
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "Y15",
                                    "factorValue": "15年交"
                                },
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "Y20",
                                    "factorValue": "20年交"
                                }
                            ]
                        },
                        "2981,2982,2983":{
                             "action": "setvalue",
                            "factorList":[
                                
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "Y5",
                                    "factorValue": "5年交"
                                },
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "Y10",
                                    "factorValue": "10年交"
                                },
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "Y15",
                                    "factorValue": "15年交"
                                },
                                {
                                    "componentId": "insurePayWay",
                                    "factorKey": "Y20",
                                    "factorValue": "20年交"
                                }
                            ]
                        }
                    }
                }
            },
            "insureSum":{
                "type":"input",
                "subjectList":{
                    "iptArea":{
                        "1":{
                            "insureBirth":{
                                "0-17":{
                                    "action":"setMax",
                                    "max":"30"
                                },
                                "18-40":{
                                    "action":"setMax",
                                    "max":"30"
                                },
                                "41-55":{
                                    "action":"setMax",
                                    "max":"25"
                                }
                            },
                            "insureChildBirth":{
                                "0-17":{
                                    "action":"setMax",
                                    "max":"30"
                                },
                                "18-40":{
                                    "action":"setMax",
                                    "max":"30"
                                },
                                "41-55":{
                                    "action":"setMax",
                                    "max":"25"
                                }
                            }
                        },
                        "2":{
                            "insureBirth":{
                                "0-17":{
                                    "action":"setMax",
                                    "max":"25"
                                },
                                "18-40":{
                                    "action":"setMax",
                                    "max":"25"

                                },
                                "41-55":{
                                    "action":"setMax",
                                    "max":"20"
                                }
                            },
                            "insureChildBirth":{
                                "0-17":{
                                    "action":"setMax",
                                    "max":"25"
                                },
                                "18-40":{
                                    "action":"setMax",
                                    "max":"25"

                                },
                                "41-55":{
                                    "action":"setMax",
                                    "max":"20"
                                }
                            }
                        },
                        "3":{
                            "insureBirth":{
                                "0-17":{
                                    "action":"setMax",
                                    "max":"25"
                                },
                                "18-40":{
                                    "action":"setMax",
                                    "max":"20"

                                },
                                "41-55":{
                                    "action":"setMax",
                                    "max":"10"
                                }
                            },
                            "insureChildBirth":{
                                "0-17":{
                                    "action":"setMax",
                                    "max":"25"
                                },
                                "18-40":{
                                    "action":"setMax",
                                    "max":"25"

                                },
                                "41-55":{
                                    "action":"setMax",
                                    "max":"20"
                                }
                            }
                        }
                    },
                    "insureBirth":{
                        "0-17":{
                            "iptArea":{
                                "1":{
                                    "action":"setMax",
                                    "max":"30"
                                },
                                "2":{
                                    "action":"setMax",
                                    "max":"25"
                                },
                                "3":{
                                    "action":"setMax",
                                    "max":"25"
                                }
                            }
                        },
                        "18-40":{
                            "iptArea":{
                                "1":{
                                    "action":"setMax",
                                    "max":"30"
                                },
                                "2":{
                                    "action":"setMax",
                                    "max":"25"
                                },
                                "3":{
                                    "action":"setMax",
                                    "max":"20"
                                }
                            }
                        },
                        "41-55":{
                            "iptArea":{
                                "1":{
                                    "action":"setMax",
                                    "max":"25"
                                },
                                "2":{
                                    "action":"setMax",
                                    "max":"20"
                                },
                                "3":{
                                    "action":"setMax",
                                    "max":"10"
                                }
                            }
                        }
                    },
                    "insureChildBirth":{
                        "0-17":{
                            "iptArea":{
                                "1":{
                                    "action":"setMax",
                                    "max":"30"
                                },
                                "2":{
                                    "action":"setMax",
                                    "max":"25"
                                },
                                "3":{
                                    "action":"setMax",
                                    "max":"25"
                                }
                            }
                        },
                        "18-40":{
                            "iptArea":{
                                "1":{
                                    "action":"setMax",
                                    "max":"30"
                                },
                                "2":{
                                    "action":"setMax",
                                    "max":"25"
                                },
                                "3":{
                                    "action":"setMax",
                                    "max":"20"
                                }
                            }
                        },
                        "41-55":{
                            "iptArea":{
                                "1":{
                                    "action":"setMax",
                                    "max":"25"
                                },
                                "2":{
                                    "action":"setMax",
                                    "max":"20"
                                },
                                "3":{
                                    "action":"setMax",
                                    "max":"10"
                                }
                            }
                        }
                    }
                }
            },
            "insureLiability":{
                "type":"input",
                "subjectList":{
                    "insurePerson": {
                        "01": {
                            "action": "hidden"
                        },
                        "40": {
                            "action": "visible"
                        }
                    }
                }
            }
        }
    }