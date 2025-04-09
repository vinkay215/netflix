import React, { createContext, useContext, useCallback, useMemo, useState } from 'react';
import profilesData from '@/data/users.json';

export interface Profile {
    id: string;
    name: string;
    avatar: string;
}

interface UserContextType {
    profiles: Profile[];
    selectedProfile: Profile | null;
    selectProfile: (profileId: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

    const selectProfile = useCallback((profileId: string) => {
        const profile = profilesData.profiles.find(p => p.id === profileId);
        if (profile) {
            setSelectedProfile(profile);
        }
    }, []);

    const value = useMemo(() => ({
        profiles: profilesData.profiles,
        selectedProfile,
        selectProfile,
    }), [selectedProfile, selectProfile]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
} 