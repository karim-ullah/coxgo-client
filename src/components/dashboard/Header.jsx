import { Button } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

const Header = () => {

    
    return (
        <div className='bg-background rounded-2xl shadow-sm flex items-center justify-between mb-6 p-5'>
            <h2 className='font-bold text-3xl text-foreground'>Dashboard</h2>
            <Button>
                <Link href={'/upload-rx'}>Upload Rx</Link>
            </Button>
        </div>
    );
};

export default Header;