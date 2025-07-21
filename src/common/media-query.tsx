'use client'
import { useSyncExternalStore } from "react"

const MediaQuery = (query: string) => {
    const getServerSnapshot = () => true; // Return a default value during SSR

    const getSnapshot = () => typeof window !== 'undefined' && window.matchMedia(query).matches;

    const subscribe = (callback: () => void) => {
        const mediaQuery = window.matchMedia(query);
        mediaQuery.addEventListener('change', callback);
        return () => mediaQuery.removeEventListener('change', callback);
    };

    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

};


export const Mobile = () => {
    const isMobile = MediaQuery("(max-width:767px)")
    const isTablet = MediaQuery('(min-width: 768px) and (max-width: 1023px)')
    return {isMobile, isTablet};
}

