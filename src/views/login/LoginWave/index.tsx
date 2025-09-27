import useThemeStore from '@/store/modules/useThemeStore';

import { hexToRgba } from '@/utils/colorUtils';

import './index.scss';

function LoginWave() {
    const { themeColor } = useThemeStore(); // 获取主题色状态
    return (
        <div className="enter-y wave-wrapper fixed bottom-0 w-full !-z-5">
            <svg
                className="ignore-waves"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28"
                preserveAspectRatio="none"
                shapeRendering="auto"
            >
                <defs>
                    <path
                        id="gentle-wave"
                        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                    />
                </defs>
                <g className="parallax">
                    <use xlinkHref="#gentle-wave" x="48" y="0" fill={hexToRgba(themeColor, 0.4)} />
                    <use xlinkHref="#gentle-wave" x="48" y="3" fill={hexToRgba(themeColor, 0.5)} />
                    <use xlinkHref="#gentle-wave" x="48" y="5" fill={hexToRgba(themeColor, 0.6)} />
                    <use xlinkHref="#gentle-wave" x="48" y="7" fill={hexToRgba(themeColor, 0.7)} />
                </g>
            </svg>
        </div>
    );
}

export default LoginWave;
