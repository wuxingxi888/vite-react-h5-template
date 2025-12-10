import { createRoot } from 'react-dom/client';

import { useThemeSync } from '@/hooks/useThemeSync';

import App from './App.tsx';
import VirtualStatusBar from './components/VirtualStatusBar/index.tsx';
import { initAppPlugins } from './plugins/index.ts';

function AppThemeProvider() {
    useThemeSync();

    return (
        <>
            <VirtualStatusBar />
            <App />
        </>
    );
}

function setupApp() {
    initAppPlugins();
    const rootElement = document.getElementById('root');
    if (!rootElement) {
        throw new Error('Failed to find the root element');
    }

    createRoot(rootElement).render(<AppThemeProvider />);
}

setupApp();
