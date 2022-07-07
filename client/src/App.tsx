import './App.css';
import {BrowserRouter} from 'react-router-dom'
import Router from './Router'
import {RecoilRoot} from 'recoil'
import Common from './compts/Common'

export default () => {
  return (
    <div className='App'>
    <RecoilRoot>
      <BrowserRouter>
        <Common.Header />
        <Common.ScrollToTop />
        <Router />
      </BrowserRouter>
      <Common.Footer />
    </RecoilRoot>
    </div>
  );
}