import React from 'react';
import {Link} from 'react-router-dom';

export const Tag =(props) => {
    const template=<div
                       style ={{background: props.bck,
                                fontsize:props.size,
                                color:props.color,
                                padding: '5px 10px',
                                display: 'inline-block',
                                fontFamily:'Righteous',
                                ...props.add
        }}
    >
    {props.children}
    </div>

    if(props.link){
        return(<Link to={props.linkto}>
            {template}
        </Link>)
    }
    else{
        return template;
    }

}


export const firebaseLooper = (snapshot) => {
    const data=[];
    snapshot.forEach((childSnapshot) => {
        data.push({
            ...childSnapshot.val(),
            id: childSnapshot.key
        })
    })

    return data;
}

export const reverseArray = (ActArray) => {

    let reversedArray =[];
    for(let i=ActArray.length-1;i>=0;i--)
    {
        reversedArray.push(ActArray[i]);
    }

    return reversedArray;

}