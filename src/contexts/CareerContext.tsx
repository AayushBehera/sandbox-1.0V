import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { UserProfile, Skill, Preference, CareerRole, SavedCareer, AssessmentData } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface CareerContextType {
  assessmentData: AssessmentData;
  updateProfile: (profile: UserProfile) => void;
  updateSkills: (skills: Skill[]) => void;
  updatePreferences: (preferences: Preference) => void;
  results: CareerRole[];
  setResults: (results: CareerRole[]) => void;
  savedCareers: SavedCareer[];
  saveCareer: (career: CareerRole, selectedPath: 'fast' | 'budget' | 'safe') => void;
  removeSavedCareer: (roleId: string) => void;
  updateSavedCareer: (roleId: string, updates: Partial<SavedCareer>) => void;
  compareCareers: CareerRole[];
  addToCompare: (career: CareerRole) => void;
  removeFromCompare: (careerId: string) => void;
  clearCompare: () => void;
}

const CareerContext = createContext<CareerContextType | undefined>(undefined);

export const CareerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    profile: null,
    skills: [],
    preferences: null,
  });

  const [savedCareers, setSavedCareers] = useLocalStorage<SavedCareer[]>('savedCareers', []);
  const [compareCareers, setCompareCareers] = useState<CareerRole[]>([]);
  const [results, setResults] = useState<CareerRole[]>([]);

  const updateProfile = useCallback((profile: UserProfile) => {
    setAssessmentData(prev => ({ ...prev, profile }));
  }, []);

  const updateSkills = useCallback((skills: Skill[]) => {
    setAssessmentData(prev => ({ ...prev, skills }));
  }, []);

  const updatePreferences = useCallback((preferences: Preference) => {
    setAssessmentData(prev => ({ ...prev, preferences }));
  }, []);

  const saveCareer = useCallback((career: CareerRole, selectedPath: 'fast' | 'budget' | 'safe') => {
    const savedCareer: SavedCareer = {
      roleId: career.id,
      roleName: career.name,
      domain: career.domain,
      selectedPath,
      completedSteps: [],
      createdAt: new Date().toISOString(),
    };
    setSavedCareers(prev => {
      const existing = prev.findIndex(sc => sc.roleId === career.id);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = savedCareer;
        return updated;
      }
      return [...prev, savedCareer];
    });
  }, [setSavedCareers]);

  const removeSavedCareer = useCallback((roleId: string) => {
    setSavedCareers(prev => prev.filter(sc => sc.roleId !== roleId));
  }, [setSavedCareers]);

  const updateSavedCareer = useCallback((roleId: string, updates: Partial<SavedCareer>) => {
    setSavedCareers(prev =>
      prev.map(sc => (sc.roleId === roleId ? { ...sc, ...updates } : sc))
    );
  }, [setSavedCareers]);

  const addToCompare = useCallback((career: CareerRole) => {
    setCompareCareers(prev => {
      if (prev.find(c => c.id === career.id)) return prev;
      if (prev.length >= 4) return prev; // Max 4 comparisons
      return [...prev, career];
    });
  }, []);

  const removeFromCompare = useCallback((careerId: string) => {
    setCompareCareers(prev => prev.filter(c => c.id !== careerId));
  }, []);

  const clearCompare = useCallback(() => {
    setCompareCareers([]);
  }, []);

  return (
    <CareerContext.Provider
      value={{
        assessmentData,
        updateProfile,
        updateSkills,
        updatePreferences,
        results,
        setResults,
        savedCareers,
        saveCareer,
        removeSavedCareer,
        updateSavedCareer,
        compareCareers,
        addToCompare,
        removeFromCompare,
        clearCompare,
      }}
    >
      {children}
    </CareerContext.Provider>
  );
};

export function useCareer() {
  const context = useContext(CareerContext);
  if (context === undefined) {
    throw new Error('useCareer must be used within a CareerProvider');
  }
  return context;
}
