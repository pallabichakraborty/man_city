import React from 'react';
import {Link} from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';

import {firebase} from '../../../firebase';

const AdminLayout = () => {

    const links =[
        {
            title: 'Matches',
            linkTo:'/admin_matches'
        },
        {
            title: 'Add Match',
            linkTo:'/admin_matches/add_match'
        },
        {
            title: 'Players',
            linkTo:'/admin_players'
        },
        {
            title: 'Add Players',
            linkTo:'/admin_players/add_players'
        }
    ]

    const renderItems = () => {
        return(
            links.map((link,index) => {
                return(<Link to={link.linkTo} key={index}>
                <ListItem button style ={
                    {
                        color:'#ffffff',
                        fontWeight:'300',
                        borderBottom: '1px solid #353535'
                    }
                }> {link.title}</ListItem>
                </Link>)
            })
        )
    }

     const logoutHandler = () =>{
        firebase.auth().signOut().then(
            () => {
                console.log('Logged out successfully!!!!')
            }, (error) => {
                console.log('Error Logging out')
            }
        )
    }
    return (
        <div>
            {renderItems()}
            <ListItem button style ={
                    {
                        color:'#ffffff',
                        fontWeight:'300',
                        borderBottom: '1px solid #353535'
                    }
                } onClick={
                    () => logoutHandler()
                }>Log Out</ListItem>
        </div>
    );
};

export default AdminLayout;