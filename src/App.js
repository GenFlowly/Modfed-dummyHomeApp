import React, { lazy, Suspense } from 'react'; // Must be imported for webpack to work
import './App.css';

const Header = lazy(() => import('HeaderApp/Header'));

function App() {
    return (
        <div className="App-header">
            <Suspense fallback={<div>Loading Header...</div>}>
                <Header />
            </Suspense>
            <div className="App-header">Demo home page</div>
        </div>
    );
}

export default App;