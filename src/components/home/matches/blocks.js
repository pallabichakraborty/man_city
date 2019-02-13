import React, { Component } from 'react';
import {firebaseMatches} from '../../../firebase';
import {firebaseLooper, reverseArray} from '../../ui/misc';
import MatchesBlock from '../../ui/matches_block';

import Slide from 'react-reveal/Slide'

class blocks extends Component {
    state = {
        matches:[]
    }

    componentDidMount = () => {
        firebaseMatches.limitToLast(6)
                       .once('value')
                       .then ((snapshot)=> {
                           let matches=reverseArray(firebaseLooper(snapshot));
                           
                            this.setState(
                                {
                                    matches
                                }
                            )
                            return matches;
                       })
    }

    showMatches = (matches) => {
        return (
            matches ? matches.map((match,index) => (
                <Slide key ={match.id}  bottom>
                    <div className="item">
                        <div className="wrapper">
                            <MatchesBlock key={index} match={match}
                            ></MatchesBlock>
                        </div>
                   </div>
                </Slide>
                
            )):null
        )
    }
    render() {
        return (
            <div className="home_matches">
                {this.showMatches(this.state.matches)}
            </div>
        );
    }
}

export default blocks;