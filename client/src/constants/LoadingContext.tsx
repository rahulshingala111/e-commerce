import React, { createContext, useContext, useState, ReactNode } from 'react';
import './loading.css';

interface LoadingContextType {
    loading: boolean;
    startLoading: () => void;
    stopLoading: () => void;

};

interface LoadingProviderContexInterface {
    children: ReactNode
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<LoadingProviderContexInterface> = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const startLoading = () => setLoading(true)
    const stopLoading = () => setLoading(false)


    return (
        <LoadingContext.Provider value={{ loading, startLoading, stopLoading }}>
            {children}
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                </div>
            )}
        </LoadingContext.Provider>
    )
};

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within LoadingProvider');
    }
    return context;
};