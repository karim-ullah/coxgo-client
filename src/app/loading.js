import { Spinner } from '@heroui/react';
import React from 'react';

const loading = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-2 min-h-screen">
        <Spinner size="xl" />
        <span className="text-xs text-muted">Loading...</span>
      </div>
    );
};

export default loading;