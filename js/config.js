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
        getRoomDetailCategory: "/room/category",
    },
    Account: {
        getAll: "/account",
        getById: "/account/$1"
    }, 
    User: {
        getAll: "/user?room=$1",
        getById: "/user/$1",
        register: "/user",
        update: "/user/$1",
        delete: "/user/$1",

        // User account
        login: "/user/login",
        changePassword: "/user/changepassword",
        forgotPassword: "/user/resetpassword",
        logout: "/user/logout",

        // User Document
        removeUserDocument: "/user/$1/document",

        // User Setting
        getUserSetting: "/user/$1/settings",
        updateUserSetting: "/user/$1/settings",

        // Contactable Person
        getAllContactable: "/user/$1/contactable",
        addContactable: "/user/$1/contactable",
        editContactable: "/user/$1/contactable",
        deleteContactable: "/user/$1/contactable"
    }, 
    Room: {
        getAll: "/room",
        getAllAvailable: "/room/available",
        getById: "/room/$1",
        create: "/room",
        update: "/room/$1",
        delete: "/room/$1",

        // Room Details
        getDetail: "/room/$1/details",
        addDetail: "/room/$1/details",
        editDetail: "/room/$1/details",
        removeDetail: "/room/$1/details",

        // Room Price Detail
        getPrice: "/room/$1/prices",
        addPrice: "/room/$1/prices",
        editPrice: "/room/$1/prices",
        removePrice: "/room/$1/prices"
    }, 
    Announcement: {
        getAll: "/announcement",
        getById: "/announcement/$1",
        create: "/announcement",
        update: "/announcement/$1",
        delete: "/announcement/$1",
    }, 
    Service: {
        getAll: "/service"
    }
}