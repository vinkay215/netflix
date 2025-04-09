import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

export default function useCachedResources() {
    const [isLoadingComplete, setLoadingComplete] = useState(false);

    useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                await Font.loadAsync({
                    'arialic': require('../assets/fonts/arialic.ttf'),
                });
            } catch (e) {
                console.warn(e);
            } finally {
                setLoadingComplete(true);
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    return isLoadingComplete;
} 