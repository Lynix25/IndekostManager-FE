export const END_POINT = "http://localhost:8123";
export const SECRET = "indekossecret";

// ====================================== CONSTANT =======================================
export const Event = {
    timeout: 1500
}

export const Constant = {
    serviceRequestStatus: {
        REJECTED: "Ditolak", 
        SUBMITTED: "Menunggu Konfirmasi", 
        ACCEPTED: "Diterima", 
        ON_PROCESS: "Dalam Pengerjaan", 
        COMPLETED: "Selesai"
    },
    userAttribute: {
        maritalStatus: {
            MARRIED: "Menikah",
            SINGLE: "Lajang"
        },
        gender: {
            LAKILAKI: "Laki-laki",
            PEREMPUAN: "Perempuan"
        }
    },
    modalType: {
        FORM: "form",
        DELETECONFIRMATION: "delete"
    },
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
    }, 
    serviceCategory: {
        LAUNDRY: "Laundry",
        PEMBERSIHAN_KAMAR: "Pembersihan Kamar",
        PERBAIKAN_FASILITAS: "Perbaikan Fasilitas", 
        LAYANAN_LAINNYA: "Layanan Lainnya"
    }
}

// ====================================== END POINT ======================================
export const ServiceURL = {
    MasterData: {
        getRole: "/role",
        getRoomDetailCategory: "/room/category",
        getServiceCategory: "/service/category"
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
        getContactable: (id) => `/user/${id}/contactable?person=`,
        addContactable: (id) => `/user/${id}/contactable`,
        editContactable: (id) => `/user/${id}/contactable?person=`,
        deleteContactable: (id) => `/user/${id}/contactable?person=`
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
        getAll: "/service",
        getById: (id) => `/service/${id}`
    },
    Task: {
        create: "/task",
        getAll: (status) => `/task?status=${status}`
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