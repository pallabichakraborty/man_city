import React, { Component } from 'react';
import {easePolyOut} from 'd3-ease';
import { Animate } from 'react-move';

class Stripes extends Component {

    state ={
        stripes:[
            {
                background: '#98c5e9',
                left:120,
                rotate:25,
                top:-260,
                delay:0,
                opacity:1
             },
            {
                background: '#ffffff',
                left:360,
                rotate:25,
                top:-397,
                delay:200,
                opacity:1
            },
            {
                background: '#98c5e9',
                left:600,
                rotate:25,
                top:-498,
                delay:400,
                opacity:1
            }
        ]
    }

    showStripes = () => {
        return(
            this.state.stripes.map(
                (stripe,index) => {
                    return (
                        <Animate
                                 key={index}
                                 show={true}
                                 start={{
                                     background:'#ffffff',
                                     opacity:0,
                                     left:0,
                                     rotate:0,
                                     top:0

                                     
                                 }}
                                 enter={{
                                    background:stripe.background,
                                    opacity:[stripe.opacity],
                                    left:[stripe.left],
                                    rotate: [stripe.rotate],
                                    top: [stripe.top],
                                    timing: { duration: 100, delay: [stripe.delay], ease: easePolyOut },
                                    events: {
                                        end()
                                        {
                                            console.log("Animation finished")
                                        }
                                    }
                                 }}
                                 >
                            {
                                ({background,opacity,left,rotate,top})=> {
                                    return(
                                            <div
                                                className="stripe"
                                                style={{
                                                    background,
                                                    opacity,
                                                    transform: `rotate(${rotate}deg) translate(${left}px,${top}px)`
                                                    }}>
                                            </div>
                                    );
                                }
                            }
                        </Animate>
                    );
                }
            )
        );
    }

    render() {
        
        return (
            <div className="featured_stripes">
                {this.showStripes()}
            </div>
        );
    }
}

export default Stripes;