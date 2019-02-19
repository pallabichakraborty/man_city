import React, { Component } from 'react';
import AdminLayout from '../../../hoc/adminLayout';
import { Link } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TableHead } from '@material-ui/core';

import { firebasePlayers } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../ui/misc';

class Player extends Component {
    state = {
        isLoading: true,
        players: [],
        page: 0,
        rowsPerPage: 5
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ page: 0, rowsPerPage: event.target.value });
    };

    componentDidMount = () => {
        firebasePlayers.once('value').then(snapshot => {
            const players = firebaseLooper(snapshot);
            this.setState(
                {
                    isLoading: false,
                    players: reverseArray(players)
                }
            )
        })
    }

    render() {

        const { rowsPerPage, page } = this.state;

        return (
            <AdminLayout>
                <div className="admin_progress">
                    {
                        this.state.isLoading ?
                            <CircularProgress thickness={7}
                                style={{
                                    color: '#98c5e9'
                                }} />
                            : ''
                    }
                </div>

                <Paper >
                    <div >
                        <Table >
                            <TableHead>
                                <TableRow>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Number</TableCell>
                                    <TableCell>Position</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.players
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((player, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell><Link to={`/admin_players/add_players/${player.id}`}>{player.name}</Link></TableCell>
                                                    <TableCell><Link to={`/admin_players/add_players/${player.id}`}>{player.lastname}</Link></TableCell>
                                                    <TableCell><Link to={`/admin_players/add_players/${player.id}`}>{player.number}</Link></TableCell>
                                                    <TableCell>{player.position}</TableCell>
                                                </TableRow>
                                            )
                                        })
                                }
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        colSpan={3}
                                        count={this.state.players.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </Paper>

            </AdminLayout>

        );
    }
}

export default Player;