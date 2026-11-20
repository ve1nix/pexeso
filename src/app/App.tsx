import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { GamePage } from 'pages/game';
import { StartPage } from 'pages/start';
import { ROUTES } from 'shared/config/routes';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={ROUTES.home} element={<StartPage />} />
      <Route path={ROUTES.game} element={<GamePage />} />
      <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
    </Routes>
  </BrowserRouter>
);
