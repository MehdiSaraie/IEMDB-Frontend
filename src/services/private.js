import { useHistory } from 'react-router-dom';
import { getToken, useAuth } from '../hooks/use-auth';

export async function privateRequest(url, options={}) {
    const response = await fetch(url, { ...options });
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    if (response.status === 401) {
        return null;
    }
        
}