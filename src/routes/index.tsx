import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import { commonRoutes } from './common';
import { publicRoutes } from './public';
import { PageSpinner } from '@/components/Elements/Spinner/PageSpinner';

export const AppRoutes = () => {
    const routes = [...publicRoutes(), ...commonRoutes()];
    const element = useRoutes(routes);

    return (
        <Suspense fallback={<PageSpinner />}>
            {element}
        </Suspense>
    );
};