import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import './App.css';

import Navigations from './Navigations';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
     <ToastProvider autoDismiss newestOnTop transitionDuration>
      <Navigations></Navigations></ToastProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
