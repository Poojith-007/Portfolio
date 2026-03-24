
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ErrorBoundary } from './ErrorBoundary.tsx'

const rootElement = document.getElementById('root');
if (!rootElement) {
  document.body.innerHTML = '<div style="color:red;padding:20px;background:black;">Fatal Error: #root element not found in index.html</div>';
} else {
  try {
    createRoot(rootElement).render(
      <ErrorBoundary fallback={<div style={{color:'red', background:'black', padding:'20px'}}>Fatal React Error occurred.</div>}>
        <App />
      </ErrorBoundary>
    );
  } catch (e: any) {
    document.body.innerHTML = '<div style="color:red;padding:20px;background:black;">Fatal Initialization Error: ' + e.message + '</div>';
  }
}
