import { useMemo } from 'react';

interface ClassIconProps {
    name?: string;
    className?: string;
}

function ClassIcon({ name, className }: ClassIconProps) {
    const iconClass = useMemo(() => `${name}`, [name]);

    return <span className={`inline-block align-middle ${iconClass} ${className || ''}`.trim()} />;
}

export default ClassIcon;
