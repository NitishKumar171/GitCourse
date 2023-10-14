import { Component } from 'react';
import FirstComponent from './FirstComponent';
import SecondComponent from './SecondComponent';
import ThirdComponent from './ThirdComponent';
import ForthComponent from './FourthComponent';
import { FifthComponent } from './FirstComponent';
import LearningJavaScript from './LearningJavaScript';
import SixthComponent from './SixthComponent';

export default function LearningComponent() { 
    return (
      <div className="LearningComponent">
         <FirstComponent/>
         <SecondComponent/>
         <ThirdComponent/>
         <ForthComponent/>
         <FifthComponent/>
         <LearningJavaScript/>
         <SixthComponent/>
=      </div>
    );
  }
  