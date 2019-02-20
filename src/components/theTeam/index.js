import React, { Component } from 'react';

import PlayerCard from '../ui/playerCard';
import Fade from 'react-reveal/Fade';

import Stripes from '../../resources/images/stripes.png';

import { firebasePlayers, firebase } from '../../firebase';
import { firebaseLooper } from '../ui/misc';

import { Promise } from 'core-js';

import CircularProgress from '@material-ui/core/CircularProgress'

class TheTeam extends Component {
    state = {
        loading: true,
        players: []
    }

    componentDidMount = () => {
        firebasePlayers.once('value')
            .then((snapshot) => {
                const players = firebaseLooper(snapshot);
                let promises = [];
                for (let key in players) {
                    promises.push(
                        new Promise((resolve, reject) => {
                            firebase.storage()
                                .ref('players')
                                .child(players[key].image)
                                .getDownloadURL()
                                .then(url => {
                                    players[key].url = url;
                                    resolve();
                                })
                                .catch((error) => {
                                    reject();
                                })
                        })
                    )
                }

                Promise.all(promises)
                    .then(() => {
                        this.setState({
                            loading: false,
                            players
                        })
                    })

            })
    }
    showPlayersByCategory = (category) => {
        return (
            this.state.players ?
                this.state.players.map((player, index) => {
                    console.log(player.position);
                    console.log(category)
                    return (player.position === category ?
                        <Fade delay= {index*20} left key={index}>
                            <div className="item">
                                <PlayerCard number={player.number}
                                    name={player.name}
                                    lastname={player.lastname}
                                    bck={player.url}
                                />
                            </div>
                        </Fade>
                        : null)
                })
                : null
        )
    }
    render() {
        return (
            <div className="the_team_container"
                style={{ background: `url(${Stripes}) repeat` }}>
                {
                    !this.state.loading ?
                        <div>
                            <div className="team_category_wrapper">
                                <div className="title">Keepers</div>
                                <div className="team_cards">
                                    {this.showPlayersByCategory('Keeper')}
                                </div>
                            </div>
                            <div className="team_category_wrapper">
                                <div className="title">Defence</div>
                                <div className="team_cards">
                                    {this.showPlayersByCategory('Defence')}
                                </div>
                            </div>
                            <div className="team_category_wrapper">
                                <div className="title">Midfield</div>
                                <div className="team_cards">
                                    {this.showPlayersByCategory('Midfield')}
                                </div>
                            </div>
                            <div className="team_category_wrapper">
                                <div className="title">Striker</div>
                                <div className="team_cards">
                                    {this.showPlayersByCategory('Striker')}
                                </div>
                            </div>
                        </div>
                        : <div className="container"><CircularProgress thickness={7} /></div>
                }

            </div>
        );
    }
}

export default TheTeam;