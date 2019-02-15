import React, { Component } from 'react';
import stripes from '../../../resources/images/stripes.png';
import { Tag } from '../../ui/misc';
import HomeCards from './cards'

import Reveal from 'react-reveal';

class MeetPlayers extends Component {

    state={
        show:true
    }

    returnTagText = (text) => {
        return (
            <Tag bck="#0e1731" size="100px" color="#ffffff"
                add={{
                    display: 'inline-block',
                    marginBottom: '20px'
                }}>
                {text}
            </Tag>
        );
    }
    render() {
        return (
            <Reveal
                    fraction={0.7}
                    onReveal={() => {
                        this.setState(
                            {show:true}
                        )
                    }}>
                <div className="home_meetplayers"
                    style={{
                        background: `#ffffff url(${stripes})`
                    }}>
                    <div className="container">
                        <div className="home_meetplayers_wrapper">
                            <div className="home_card_wrapper">
                                <HomeCards 
                                           show={this.state.show}>
                                </HomeCards>
                        </div>
                            <div className="home_text_wrapper">
                                <div>
                                    {this.returnTagText('Meet')}
                                </div>
                                <div>
                                    {this.returnTagText('The')}
                                </div>
                                <div>
                                    {this.returnTagText('Players')}
                                </div>
                                <div>
                                    <Tag bck="#ffffff"
                                        size="20px"
                                        color="#0e1731"
                                        link={true}
                                        linkto="/the_team"
                                        add={{
                                            display: 'inline-block',
                                            marginBottom: '20px',
                                            border: '1px solid #0e1731'
                                        }}>
                                        Meet them here
                                   </Tag>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Reveal>

        );
    }
}

export default MeetPlayers;