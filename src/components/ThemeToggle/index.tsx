import { Button } from 'antd-mobile';

import useThemeStore from '@/store/modules/useThemeStore';

function ThemeToggle() {
    const { themeMode, setThemeMode } = useThemeStore();

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
