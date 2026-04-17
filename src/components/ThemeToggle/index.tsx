import { Button } from 'antd-mobile';

import { useThemeStore } from '@/stores';

function ThemeToggle() {
    const themeMode = useThemeStore((state) => state.themeMode);
    const setThemeMode = useThemeStore((state) => state.setThemeMode);

    const toggleTheme = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light');
    };

    return (
        <Button size="small" onClick={toggleTheme} className="my-card">
            {themeMode === 'light' ? '🌙 暗色' : '☀️ 亮色'}
        </Button>
    );
}

export default ThemeToggle;
