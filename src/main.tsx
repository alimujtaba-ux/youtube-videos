import {createRoot} from 'react-dom/client';
import {VideoApp} from './app/VideoApp';
import './styles/global.css';
createRoot(document.getElementById('root')!).render(<VideoApp/>);
