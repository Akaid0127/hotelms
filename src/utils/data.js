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

// 获取订单
export const orderGet = () => {
    return axios({
        url: '/orders',
        method: "get",
    })
}

// 添加订单
export const orderAdd = (params) => {
    return axios({
        url: '/orders',
        method: "post",
        data: {
            user_id: params.user_id,
            room_id: params.room_id,
            check_in_time: params.check_in_time,
            stay_length: params.stay_length,
        }
    })
}

// 编辑订单
export const orderEdit = (params) => {
    return axios({
        url: `/orders/${params.id}`,
        method: "patch",
        params: { payment_status: params.payment_status, },
    })
}

// 删除订单
export const orderDelete = (params) => {
    return axios({
        url: `/orders/${params}`,
        method: "delete",
    })
<<<<<<< HEAD
=======
}

// 获取管理员--me
export const adminGet = () => {
    return axios({
        url: '/admins/me',
        method: "get",
    })
}

// 编辑管理员密码--me
export const adminEdit = (params) => {
    return axios({
        url: `/admins/me`,
        method: "patch",
        data: {
            password: params.password,
            name: params.name,
            new_password: params.new_password,
        }
    })
}

// 删除管理员--me
export const adminDelete = (params) => {
    return axios({
        url: `/admins/me/`,
        method: "delete",
        data: {
            password: params
        }
    })
}

// 添加管理员
export const adminAdd = (params) => {
    return axios({
        url: '/admins',
        method: "post",
        data: {
            job_number: params.job_number,
            name: params.name,
            password: params.password,
        }
    })
>>>>>>> 3bc577c (123)
}