export const END_POINT = "http://localhost:8123";
export const SECRET = "indekossecret";

// ====================================== CONSTANT =======================================
export const Constant = {
    httpStatus: {
        ERROR: "error",
        SUCCESS: "success",
        WARNING: "warning",
        UNKNOWN: "unknown"
    },
    role: {
        OWNER: "Owner",
        ADMIN: "Admin",
        TENANT: "Tenant"
    },
    roomDetailsCategory: {
        KAMAR_TIDUR: "Kamar Tidur", 
        KAMAR_MANDI: "Kamar Mandi", 
        FURNITURE: "Furniture", 
        ALAT_ELEKTRONIK: "Alat Elektronik", 
        FASILITAS_KAMAR_LAINNYA: "Fasilitas Kamar Lainnya"
    }
}

// ====================================== END POINT ======================================
export const ServiceURL = {
    MasterData: {
        getRole: "/room",
        getRoomDetailCategory: "/room/category"
    },
    Account: {
        getAll: "/account/all",
        getById: (id) => `/account/${id}`,
        getByUsername: (username) => `/account?username=${username}`
    },
    User: {
        getAll: "/user?room=",
        getById: (id) => `/user/${id}`,
        register: "/user",
        update: (id) => `/user/${id}`,
        delete: (id) => `/user/${id}`,

        // User account
        login: "/user/login",
        changePassword: `/user/changepassword`,
        forgotPassword: "/user/resetpassword",
        logout: (id) => `/user/logout?user=${id}`,

        // User Document
        removeUserDocument: (id) => `/user/${id}/document`,

        // User Setting
        getUserSetting: (id) => `/user/${id}/settings`,
        updateUserSetting: (id) => `/user/${id}/settings`,

        // Contactable Person
        getAllContactable: (id) => `/user/${id}/contactable`,
        addContactable: (id) => `/user/${id}/contactable`,
        editContactable: (id) => `/user/${id}/contactable`,
        deleteContactable: (id) => `/user/${id}/contactable`
    },
    Room: {
        getAll: "/room",
        getAllAvailable: "/room/available",
        getById: (id) => `/room/${id}`,
        create: "/room",
        update: (id) => `/room/${id}`,
        delete: (id) => `/room/${id}`,

        // Room Details
        getDetail: (id) => `/room/${id}/details`,
        addDetail: (id) => `/room/${id}/details`,
        editDetail: (id) => `/room/${id}/details`,
        removeDetail: (id) => `/room/${id}/details`,

        // Room Price Detail
        getPrice: (id) => `/room/${id}/prices`,
        addPrice: (id) => `/room/${id}/prices`,
        editPrice: (id) => `/room/${id}/prices`,
        removePrice: (id) => `/room/${id}/prices`
    },
    Service:{
        getAll: "/service"
    },
    Announcement: {
        getAll: "/announcement",
        getById: (id) => `/announcement/${id}`,
        create: "/announcement",
        update: (id) => `/announcement/${id}`,
        delete: (id) => `/announcement/${id}`
    },
    Transaction: {
        unpaid: (id) => `/transaction/unpaid/${id}`,
    }
}