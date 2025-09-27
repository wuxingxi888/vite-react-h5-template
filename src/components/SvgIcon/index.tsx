import type { SVGProps } from 'react';

type SvgIconProps = {
    name: string;
    prefix?: string;
    color?: string;
} & SVGProps<SVGSVGElement>;

export default function SvgIcon({ name, prefix = 'icon', color = '#333', ...props }: SvgIconProps) {
    const symbolId = `#${prefix}-${name}`;

    return (
        <svg {...props} aria-hidden="true">
            <use href={symbolId} fill={color} />
        </svg>
    );
}
