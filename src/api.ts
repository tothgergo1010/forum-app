// src/api.ts

export const loginUser = async (username: string, password: string) => {
    const response = await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    return response.json();
};

export const registerUser = async (
    username: string, 
    password: string, 
    passwordConfirm: string, 
    firstName: string, 
    lastName: string
) => {
    const response = await fetch('http://localhost:5000/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, passwordConfirm, firstName, lastName }),
    });
    return response.json();
};

export const getUserProfile = async (token: string) => {
    const response = await fetch('http://localhost:5000/user', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
};

export const createForum = async (forum: { title: string; description: string }, token: string) => {
    const response = await fetch('http://localhost:5000/forum', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(forum),
    });

    // Check for response status and parse JSON
    if (response.ok) {
        return { success: true };
    } else {
        const errorData = await response.json();
        return { success: false, message: errorData.message };
    }
};

export const searchForums = async (params: any, token: string) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`http://localhost:5000/forum?${query}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    if (response.ok) {
        return await response.json();
    } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }
};
