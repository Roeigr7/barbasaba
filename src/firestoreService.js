import firebase from './firebase';

const db = firebase.firestore();

export async function createUser(phone) {
  const usersRef = db.collection('users').doc(`${phone}`);
  usersRef.get().then(docSnapshot => {
    if (docSnapshot.exists && docSnapshot.get('isPlayed') === true) {
      console.log('נירשם כבר ושיחק');
    } else {
      usersRef
        .set({
          isPlayed: false,
        })
        .then(() => {
          console.log('Document successfully written!');
        })
        .catch(error => {
          console.error('Error writing document: ', error);
        });
    }
  });
}

export async function handlePlayedField(currentUser) {
  const userRef = db.collection('users').doc(`${currentUser.phoneNumber}`);
  return await userRef.get().then(docSnapshot => {
    if (docSnapshot.exists && docSnapshot.get('isPlayed') === true) {
      console.log('שיחק כברררר');
      return true;
    } else {
      if (userRef)
        return userRef
          .update({
            isPlayed: true,
          })
          .then(() => {
            console.log('Document successfully updated!');
            return false;
          })
          .catch(error => {
            console.error('Error updating document: ', error);
          });
    }
  });
}

export async function signOutUser(currentUser) {
  firebase
    .auth()
    .signOut()
    .then(
      function () {
        console.log('Signed Out', currentUser);
      },
      function (error) {
        console.error('Sign Out Error', error);
      }
    );
}
