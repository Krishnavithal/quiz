import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import './App.css';
import Quiz from './components/Quiz';
import Home from './components/Home';
import Result from './components/Result';
const Routing = () => {
  return (
    <Switch>
      <Route exact path='/'><Home></Home></Route>
      <Route path='/quiz'><Quiz></Quiz></Route>
      <Route path='/result'><Result></Result></Route>
    </Switch>
  )
}
function App() {
  return (
    <>
      <BrowserRouter>
        <Routing></Routing>
      </BrowserRouter>
    </>
  );
}

export default App;
