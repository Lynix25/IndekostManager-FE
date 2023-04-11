export const END_POINT = "http://localhost:8123";
export const SECRET = "indekossecret";

// ====================================== CONSTANT =======================================
export const Constant = {
    httpStatus: {
        ERROR: "error",
        SUCCESS: "success",
        UNKNOWN: "unknown"
    },
    role: {
        OWNER: "Owner",
        ADMIN: "Admin",
        TENANT: "Tenant"
    }
}

export const CONTENT_TYPE = {
    FORM: "multipart/form-data"
}

// ====================================== END POINT ======================================
export const ServiceURL = {
    MasterData: {
        getRole: "/room",
        getRoomDetailCategory: "/room/category",
    },
    Account: {
        getAll: "/account",
        getById: (id) => `/account/${id}`
    },
    User: {
        getAll: "/user",
        getById: (id) => `/user/${id}`,
        register: "/user",
        update: (id) => `/user/${id}`,
        delete: (id) => `/user/${id}`,

        // User account
        login: "/user/login",
        changePassword: `/user/changepassword`,
        forgotPassword: "/user/resetpassword",
        logout: "/user/logout",

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
    Service: {
        getAll: "/service"
    },
    Announcement: {
        getAll: "/announcement",
        getById: (id) => `/announcement/${id}`,
        create: "/announcement",
        update: (id) => `/announcement/${id}`,
        delete: (id) => `/announcement/${id}`,
    },
    Transaction: {
        unpaid: (id) => `/transaction/unpaid/${id}`,
    }
}