import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../hoc/adminLayout';

import { firebaseMatches } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../ui/misc'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

import CircularProgress from '@material-ui/core/CircularProgress';



class AdminMatches extends Component {
    state = {
        isloading: true,
        matches: [],
        page: 0,
        rowsPerPage: 5,
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    componentDidMount = () => {
        firebaseMatches.once('value').then(snapshot => {
            const matches = firebaseLooper(snapshot);
            this.setState(
                {
                    isloading: false,
                    matches: reverseArray(matches)
                }
            )
        })
    }
    render() {
        return (
            <AdminLayout>
                <div>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Match</TableCell>
                                    <TableCell>Result</TableCell>
                                    <TableCell>Final</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.matches ?
                                    this.state.matches
                                        .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                        .map((match, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    {match.date}
                                                </TableCell>
                                                <TableCell>
                                                    <Link to={`/admin_matches/edit_match/${match.id}`}>
                                                        {match.away} <strong>-</strong> {match.local}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    {match.resultAway} <strong>-</strong> {match.resultLocal}
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        match.final === 'Yes' ?
                                                            <span className="matches_tag_red">Final</span>
                                                            :
                                                            <span className="matches_tag_green">Not played yet</span>
                                                    }
                                                </TableCell>

                                            </TableRow>
                                        )) : null
                                }
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={this.state.matches.length}
                            rowsPerPage={this.state.rowsPerPage}
                            page={this.state.page}
                            backIconButtonProps={{
                                'aria-label': 'Previous Page',
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'Next Page',
                            }}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                    </Paper>
                    <div className="admin_progress">
                        {
                            this.state.isloading ? <CircularProgress thickness={7}
                                style={{
                                    color: '#98c5e9'
                                }} />
                                : ''
                        }
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export default AdminMatches;