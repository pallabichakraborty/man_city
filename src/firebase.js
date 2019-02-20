import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

let config = {

};
firebase.initializeApp(config);

const firebaseDB=firebase.database();

const firebaseMatches=firebaseDB.ref('matches');
const firebasePromotions=firebaseDB.ref('promotions');
const firebaseTeams=firebaseDB.ref('teams');
const firebasePlayers = firebaseDB.ref('players');

export {firebase,
        firebaseDB,
        firebaseMatches, 
        firebasePromotions,
        firebaseTeams,
        firebasePlayers};