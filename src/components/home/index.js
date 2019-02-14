import React from 'react';
import Featured from './featured/index';
import Matches from './matches';
import MeetPlayers from '../home/meetPlayers';


const Home = () => {
    return (
       <div className="bck_blue">
         <Featured />
         <Matches/>
         <MeetPlayers/>
       </div>
    );
};

export default Home;