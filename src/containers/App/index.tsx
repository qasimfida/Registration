import * as React from 'react';
import './App.scss';
import Stepper from '../../components/Stepper/index';

interface IProps {
  className ?: String
}
export const  App = (props: IProps) => (
  <div className={`App ${props.className}`} >
     <header className="App-header">
       <Stepper/>
     </header>
  </div>
  )
  
  export default App;
  