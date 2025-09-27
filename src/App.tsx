import { RouterProvider } from 'react-router';

import router from './router';

const App: React.FC = () => {
    return <RouterProvider router={router} />;
};

export default App;
