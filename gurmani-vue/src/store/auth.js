import { getAuth, signOut ,signInWithEmailAndPassword } from 'firebase/auth';
// import router from 'router'

export default {
    actions: {
        async login({dispatch}, {email, password}) {
            dispatch
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                console.log(userCredential);
              })
              .catch((error) => {
                  console.log(error);
              });
        },
        async logout() {
            const auth = getAuth();
            await signOut(auth).then((test) => {console.log(test)})
        }
    }
}