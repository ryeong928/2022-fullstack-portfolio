import './App.css';
import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import Router from './Router'
import {RecoilRoot} from 'recoil'
import Common from './compts/Common'
import { LoadingStore } from './context/LoadingContext';

export default () => {
  return (
    <div className='App'>
      <LoadingStore>
    <RecoilRoot>
      <BrowserRouter>
        <Common.ScrollToTop />
        <Common.Header />
        <Router />
      </BrowserRouter>
      <Common.Footer />
    </RecoilRoot>
    </LoadingStore>
    </div>
  );
}