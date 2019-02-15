import React from 'react';
import Featured from './featured/index';
import Matches from './matches';
import MeetPlayers from '../home/meetPlayers';
import Promotion from '../home/promotion'



const Home = () => {
    return (
       <div className="bck_blue">
         <Featured />
         <Matches/>
         <MeetPlayers/>
         <Promotion/>
       </div>
    );
};

export default Home;