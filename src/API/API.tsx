import axios from "axios";

export let instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "ad7bdc65-ea32-4d2b-8754-372621fa31e8"
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
}
export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout() {
        return instance.delete(`auth/login`)
    }

}

