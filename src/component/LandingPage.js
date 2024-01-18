import React from 'react';
import Header from './Header';
import Content from './Content';
import Home from '../page/Home';

function LandingPage() {
  return (
    <Home > 
        <Header></Header>
        <Content></Content>
    </Home>
  )
}

export default LandingPage