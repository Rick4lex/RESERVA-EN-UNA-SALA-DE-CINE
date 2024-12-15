/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import supabase from '../ServerBackend/Supabase';

export const useAuth = () => {
    const [session, setSession] = useState<any>(null);

    useEffect(() => {
        const fetchSession = async () => {
            const { data } = await supabase.auth.getSession();
            setSession(data.session);
        };
        fetchSession();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    const logout = async () => {
        await supabase.auth.signOut();
        setSession(null);
    };

    return { session, logout };
};
