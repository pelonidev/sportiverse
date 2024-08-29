import React, { useState, useEffect } from 'react';
import SoccerImg from '../../images/soccer.jpg'
import BasketImg from '../../images/basket.jpg'
import TennisImg from '../../images/tennis.jpg'
import PadelImg from '../../images/padel.jpg'
import './Home.css';

function Home() {
  
  return (
    <div>
      <div className="slider">
        <ul>
            <li>
                <img src={SoccerImg}/>
            </li>
            <li>
                <img src={BasketImg}/>
            </li>
            <li>
                <img src={TennisImg}/>
            </li>
            <li>
                <img src={PadelImg}/>
            </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;