import { requireRole } from '@/lib/core/server';
import React from 'react';

const layout = async({children}) => {
    await requireRole('admin')
    return <>{children}</>;
};

export default layout;