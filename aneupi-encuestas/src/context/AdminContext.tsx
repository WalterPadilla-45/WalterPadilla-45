"use client";

import React, { createContext, useContext, useState } from 'react';

interface AdminContextType {
  hayCambiosSinGuardar: boolean;
  setHayCambiosSinGuardar: (valor: boolean) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [hayCambiosSinGuardar, setHayCambiosSinGuardar] = useState(false);

  return (
    <AdminContext.Provider value={{ hayCambiosSinGuardar, setHayCambiosSinGuardar }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin debe usarse dentro de un AdminProvider');
  return context;
};