'use client'


import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppAbility } from '../types/appAbility';
import { fetchRolesAndPermissions } from '../utils/fetchRoles';
import { defineAbilitiesFor } from '../utils/ability';

interface AbilityProviderProps {
  children: ReactNode;
}

const AbilityContext = createContext<AppAbility | null>(null);

export function AbilityProvider({ children }: AbilityProviderProps) {
  const [ability, setAbility] = useState<AppAbility | null>(null);

  useEffect(() => {
    async function loadUserAndPermissions() {
      try {
        // Fetch user details from the dummy JSON file
        const response = await fetch('/user.json');
        const user = await response.json();

        // Fetch roles and permissions
        const rolesData = await fetchRolesAndPermissions();

        // Define abilities based on the fetched user details
        const definedAbility = defineAbilitiesFor(user, rolesData);
        setAbility(definedAbility);
      } catch (error) {
        console.error('Error fetching user or roles data:', error);
      }
    }

    loadUserAndPermissions();
  }, []);

  if (!ability) {
    return <div className="text-center py-10">Loading permissions...</div>;
  }

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
}

export function useAbility() {
  const context = useContext(AbilityContext);
  if (!context) {
    throw new Error('useAbility must be used within an AbilityProvider');
  }
  return context;
}
