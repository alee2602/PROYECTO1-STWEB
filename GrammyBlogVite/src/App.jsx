import React from 'react';
import '@styles/App.css';
import Header from './components/Header'; 
import Footer from './components/Footer'; 
import Router from './router/index.jsx'; 
import { NavigationProvider } from './hooks/useNavigate.jsx';
import { TokenProvider } from './hooks/useToken.jsx';

function App() {
    return (
    <div id="root" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Header />
        <main style={{ flex: '1' }}>
        <TokenProvider>
            <NavigationProvider>
                <Router /> 
            </NavigationProvider>
        </TokenProvider>
        </main>
    <Footer />
    </div>
);
}

export default App;
