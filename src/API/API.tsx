import axios from "axios";
import {ProfileInfoType} from "../Redux/ProfileReducer";

export let instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "2f11e5d5-68ba-489d-a347-1854af42d6b4"
    }
})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}& count=${pageSize}`, {withCredentials: true}
        ).then(response => response.data)
    },

    follow(userId: number) {
        return instance.post(`follow/${userId}`)
    },

    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)

    }
}

export const profileAPI = {

    getProfile(userId: string | number) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId: number | string) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status/`, {status: status})
    },
    savePhoto(file: File) {
        const formData = new FormData()
        formData.append("image", file)
        return instance.put('profile/photo/', formData, {headers: {'content-type': 'multipart/form-data'}})
    },
    saveProfile(profile: ProfileInfoType) {
        return instance.put(`profile/`, profile)

    }
}
export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string|null = null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete(`auth/login`)
    }

}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
}

