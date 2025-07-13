import axios, { AxiosError, AxiosResponse } from 'axios';

// Define the User interface based on the Spring Boot User model
export interface User {
    userId: string;
    email: string;
    status: string;
    passwordHash: string;
    createdAt: string;
    updatedAt: string;
    name: string;
}

// Define the API response structure for user-related endpoints
export interface UserAPIResponse {
    success: boolean;
    message: string;
    data?: User[] | null; // Array of users for getAllUsers
    errorCode?: number; // Optional error code for error cases
    roleId?: string; // Optional role ID for createUser response
}

// Define the DIDItem interface to match the API response
export interface DIDItem {
    did: string;
    userId: string;
    createdAt: string;
    platform: string | null;
    email: string;
    role: string;
}

// Define the API response structure for DID-related endpoints
export interface DIDAPIResponse {
    success: boolean;
    message: string;
    data?: { [key: string]: DIDItem }; // Data is optional and contains DID items keyed by didId
    errorCode?: number; // Optional error code for error cases
    did?: string; // Add optional did property for generateDid response
}

// Define the VC interface based on the vcs table schema
export interface Vc {
    vcId: string;
    userId: string;
    did: string;
    role: string;
    expiresAt: string;
    signature: string;
    createdAt: string;
}

// Define the API response structure for VC-related endpoints
export interface VcAPIResponse {
    success?: boolean;
    message?: string;
    data?: Vc | null;
    errorCode?: number;
    status?: string;
    vcId?: string;
}

// Configure axios instance
const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Base URL for your Spring Boot backend
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds timeout
});

// Fetch all users
export const getAllUsers = async (): Promise<UserAPIResponse> => {
    try {
        const response: AxiosResponse<UserAPIResponse> = await api.get('/data/users');
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<UserAPIResponse>;
        if (axiosError.response) {
            return {
                success: false,
                message: axiosError.response.data?.message || axiosError.message || 'Failed to fetch users',
                errorCode: axiosError.response.status,
            };
        }
        return {
            success: false,
            message: axiosError.message || 'Network error occurred',
            errorCode: 500,
        };
    }
};

// Create a new user
export const createUser = async (name: string, email: string, role: string): Promise<UserAPIResponse> => {
    try {
        const response: AxiosResponse<UserAPIResponse> = await api.post('/admin/create-user', { name, email, role });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<UserAPIResponse>;
        if (axiosError.response) {
            return {
                success: false,
                message: axiosError.response.data?.message || axiosError.message || 'Failed to create user',
                errorCode: axiosError.response.status,
            };
        }
        return {
            success: false,
            message: axiosError.message || 'Network error occurred',
            errorCode: 500,
        };
    }
};

// Fetch all DIDs
export const fetchDIDs = async (): Promise<DIDAPIResponse> => {
    try {
        const response: AxiosResponse<DIDAPIResponse> = await api.get('/did/fetch');
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<DIDAPIResponse>;
        if (axiosError.response) {
            return {
                success: false,
                message: axiosError.response.data?.message || axiosError.message || 'Failed to fetch DIDs',
                errorCode: axiosError.response.status,
            };
        }
        return {
            success: false,
            message: axiosError.message || 'Network error occurred',
            errorCode: 500,
        };
    }
};

// Generate a new DID
export const generateDid = async (email: string): Promise<DIDAPIResponse> => {
    try {
        const response: AxiosResponse<DIDAPIResponse> = await api.post('/did/generate', { email });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<DIDAPIResponse>;
        if (axiosError.response) {
            return {
                success: false,
                message: axiosError.response.data?.message || axiosError.message || 'Failed to generate DID',
                errorCode: axiosError.response.status,
            };
        }
        return {
            success: false,
            message: axiosError.message || 'Network error occurred',
            errorCode: 500,
        };
    }
};

// Optional: Add a delete DID function if implemented in the backend
export const deleteDID = async (didId: string): Promise<DIDAPIResponse> => {
    try {
        const response: AxiosResponse<DIDAPIResponse> = await api.delete(`/did/${didId}`);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<DIDAPIResponse>;
        if (axiosError.response) {
            return {
                success: false,
                message: axiosError.response.data?.message || axiosError.message || 'Failed to delete DID',
                errorCode: axiosError.response.status,
            };
        }
        return {
            success: false,
            message: axiosError.message || 'Network error occurred',
            errorCode: 500,
        };
    }
};

// VC-related endpoints
export const createVc = async (payload: { email: string; expirationDays: number }): Promise<VcAPIResponse> => {
    try {
        const response = await api.post('/vc/create', { ...payload, expirationDays: Number(payload.expirationDays) });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<VcAPIResponse>;
        if (axiosError.response) {
            return {
                success: false,
                message: axiosError.response.data?.message || axiosError.message || 'Failed to create VC',
                errorCode: axiosError.response.status,
            };
        }
        return {
            success: false,
            message: axiosError.message || 'Network error occurred',
            errorCode: 500,
        };
    }
};

export const fetchVc = async (userId: string): Promise<VcAPIResponse> => {
    try {
        const response = await api.get(`/vc/fetch/${userId}`);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<VcAPIResponse>;
        if (axiosError.response) {
            return {
                success: false,
                message: axiosError.response.data?.message || axiosError.message || 'Failed to fetch VC',
                errorCode: axiosError.response.status,
            };
        }
        return {
            success: false,
            message: axiosError.message || 'Network error occurred',
            errorCode: 500,
        };
    }
};

// Export the api instance for advanced usage if needed
export { api };