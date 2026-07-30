import React, { createContext, useContext, useState } from 'react';

export type DensityMode = 'comfortable' | 'compact' | 'ultra-compact';

interface DensityContextType {
  density: DensityMode;
  setDensity: (mode: DensityMode) => void;
  paddingClass: string;
  textSizeClass: string;
}

const defaultDensityContext: DensityContextType = {
  density: 'comfortable',
  setDensity: () => {},
  paddingClass: 'py-3 px-4 gap-3',
  textSizeClass: 'text-sm leading-normal',
};

const DensityContext = createContext<DensityContextType>(defaultDensityContext);

export const DensityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [density, setDensity] = useState<DensityMode>('comfortable');

  const getPaddingClass = () => {
    switch (density) {
      case 'ultra-compact':
        return 'py-1 px-2 gap-1.5';
      case 'compact':
        return 'py-2 px-3 gap-2';
      case 'comfortable':
      default:
        return 'py-3 px-4 gap-3';
    }
  };

  const getTextSizeClass = () => {
    switch (density) {
      case 'ultra-compact':
        return 'text-[11px] leading-tight';
      case 'compact':
        return 'text-xs leading-normal';
      case 'comfortable':
      default:
        return 'text-sm leading-normal';
    }
  };

  return (
    <DensityContext.Provider
      value={{
        density,
        setDensity,
        paddingClass: getPaddingClass(),
        textSizeClass: getTextSizeClass(),
      }}
    >
      {children}
    </DensityContext.Provider>
  );
};

export const useDensity = () => {
  const context = useContext(DensityContext);
  return context || defaultDensityContext;
};
