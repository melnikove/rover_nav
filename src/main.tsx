import { createRoot } from 'react-dom/client'
import './index.css'
import 'leaflet/dist/leaflet.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <App />,
)
