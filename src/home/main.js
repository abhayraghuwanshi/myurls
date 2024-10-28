import * as React from 'react';
import DynamicTabs from './DyanamicTab';
import './main-page.css'
import SearchBox from './SearchBox';

export default function MainPage() {

  return (
    <div>
        <div className='welcome-note'>Welcome, User</div>
        <SearchBox bookmarks={[]}></SearchBox>
         <div className='main-page'>
        <DynamicTabs/>
    </div>
    </div>
 
    
  );
}
