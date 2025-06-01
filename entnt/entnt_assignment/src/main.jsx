import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext.jsx'
import { ComponentsProvider } from './contexts/ComponentsContext.jsx';
import { JobsProvider } from './contexts/JobsContext.jsx';
import { ShipsProvider } from './contexts/ShipsContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
   <BrowserRouter>
      <AuthProvider>
        <ShipsProvider>
          <ComponentsProvider>
            <JobsProvider>
              <App />
            </JobsProvider>
          </ComponentsProvider>          
        </ShipsProvider>
      </AuthProvider>
    </BrowserRouter> 
  </>
)
