import { useRoutes } from 'react-router-dom';

import { commonRoutes } from './common';
import { publicRoutes } from './public';
import { protectedRoutes } from './protected';

export const AppRoutes = () => {
    const routes = [...publicRoutes, ...commonRoutes, ...protectedRoutes];
    const element = useRoutes(routes);

    return (
        <>
            {element}
        </>
    );
};