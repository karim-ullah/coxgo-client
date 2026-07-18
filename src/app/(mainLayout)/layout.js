import Navbar from '@/components/shared/Navbar';
import React from 'react';

const MainLayout = ({children}) => {
    return (
        <div>
            <Navbar/>
            {children}
        </div>
    );
};

export default MainLayout;