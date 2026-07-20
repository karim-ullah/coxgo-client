import { requireRole } from '@/lib/core/server';
import React from 'react';

const layout = async({children}) => {
    await requireRole('customer')
    return <>{children}</>;
};

export default layout;