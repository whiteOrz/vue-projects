export default {
    product: {
        name: "悦享中华",
        select: 0,
        types: [
            {
                type: "基本款",
                price: "1070",
                contents: [
                    {
                        key: "房屋主体",
                        price: "20万"
                    },
                    {
                        key: "室内附属设备",
                        price: "10万"
                    },
                    {
                        key: "室内装潢",
                        price: "10万"
                    },
                    {
                        key: "投保人室内意外",
                        price: "5万"
                    }
                ]
            },
            {
                type: "白金款",
                price: "2070",
                contents: [
                    {
                        key: "房屋主体",
                        price: "20万"
                    },
                    {
                        key: "室内附属设备",
                        price: "10万"
                    },
                    {
                        key: "室内装潢",
                        price: "10万"
                    },
                    {
                        key: "投保人室内意外",
                        price: "5万"
                    },
                    {
                        key: "其它",
                        price: "5万"
                    }
                ]
            },
            {
                type: "钻石款",
                price: "3070",
                contents: [
                    {
                        key: "房屋主体",
                        price: "20万"
                    },
                    {
                        key: "室内附属设备",
                        price: "10万"
                    },
                    {
                        key: "室内装潢",
                        price: "10万"
                    },
                    {
                        key: "投保人室内意外",
                        price: "5万"
                    },
                    {
                        key: "其它",
                        price: "5万"
                    },
                    {
                        key: "其它2",
                        price: "5万"
                    }
                ]
            }
        ]
    },
    order: {
        applicant: [
            {
                id: "username",
                label: "姓名",
                value: ""
            },
            {
                id: "usermobile",
                label: "手机号",
                value: ""
            },
            {
                id: "idNo",
                label: "身份证号",
                value: ""
            },
            {
                id: "sex",
                label: "性别",
                value: "0"
            }
        ]
    },
    pay: {
        payMode: "wx"
    }
}