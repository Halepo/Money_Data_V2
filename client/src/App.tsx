import './App.sass';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useEffect } from 'react';
import ColorPicker from './components/ColorPicker';
import { checkCachedJwtStatus } from './store/actionCreators';
import ThemeContextProvider, {
  ThemeContext,
} from './services/context/ThemeContext';
import Index from './pages/Index';
import { Routes, Route } from 'react-router';
import RedirectTo from './components/RedirectHome';
import LoginUI from './pages/auth/login/login';
import Register from './pages/auth/register/register';

export default function App() {
  useEffect(() => {
    checkCachedJwtStatus();
  }, []);

  return (
    <div className="App">
      <Provider store={store}>
        <ThemeContextProvider>
          <ColorPicker />
          <Routes>
            <Route path="/login" element={<LoginUI />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route
              path="*"
              element={
                <main style={{ padding: '1rem' }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
          <Index />
        </ThemeContextProvider>
      </Provider>
    </div>
  );
}
