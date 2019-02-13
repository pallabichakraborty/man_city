import React from 'react';
import {Tag} from '../../ui/misc';
import Block from './blocks';

const MatchesHome = () => {
    return (
        <div className="home_matches_wrapper">
            <div className="container">
                <Tag 
                        bck="#0e1731"
                        size="50px"
                        color='red'
                        add ={{
                            color: "#ffffff"
                        }}
                        >
                        Matches
                        </Tag>

                <Tag />

                <Block></Block>

                <Tag bck= "#ffffff"
                        size='22px'
                        color='0e1731'
                        link={true}
                        linkto='the_team'>
                    See More Matches
                </Tag>
            </div>
        </div>
    );
};

export default MatchesHome;