import React from 'react';
import IonicHeader from '../../IonicStyle/IonicHeader/IonicHeader';
import ReactHeader from '../../ReactStyle/ReactHeader/ReactHeader';
import UseWindowsResize from '../../UseWindowsSize/UseWindowsResize';

const Header = () => {
  const size = UseWindowsResize()
    return (
        <div>
          {
            size.width <=500 ? <IonicHeader></IonicHeader> :  <ReactHeader></ReactHeader>
          } 
           
        </div>
    );
};

export default Header;