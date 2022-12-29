import axios from "./request";

// 登录获取token
export const permitLogin = (params) => {
    return axios({
        url: '/tokens',
        method: "post",
        data: `username=${params.adminName}&password=${params.passward}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
}

// 获取用户-所有
export const userGet = () => {
    return axios({
        url: '/users',
        method: "get",
    })
}

// 添加用户
export const userAdd = (params) => {
    return axios({
        url: '/users',
        method: "post",
        data: {
            name: params.name,
            phone_number: params.phone_number,
            identity_number: params.identity_number,
            password: params.pwd,
        }
    })
}

// 编辑用户
export const userEdit = (params) => {
    return axios({
        url: `/users/${params.id}`,
        method: "patch",
        data: {
            name: params.name,
            phone_number: params.phone_number,
            identity_number: params.identity_number,
        }
    })
}

// 删除用户
export const userDelete = (params) => {
    return axios({
        url: `/users/${params}`,
        method: "delete",
    })
}

// 获取房间
export const roomGet = () => {
    return axios({
        url: '/rooms',
        method: "get",
    })
}

// 添加房间
export const roomAdd = (params) => {
    return axios({
        url: '/rooms',
        method: "post",
        data: {
            room_number: params.room_number,
            type_: params.type_,
            price: params.price,
        }
    })
}

// 编辑房间
export const roomEdit = (params) => {
    return axios({
        url: `/rooms/${params.id}`,
        method: "patch",
        data: {
            room_number: params.room_number,
            type_: params.type_,
            price: params.price,
            room_status: params.room_status,
        }
    })
}

// 删除房间
export const roomDelete = (params) => {
    return axios({
        url: `/rooms/${params}`,
        method: "delete",
    })
}