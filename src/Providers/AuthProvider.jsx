import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/firebase.config';
import useAxiosPublic from '../Hooks/useAxiosPublic';

export const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile = (name, photo) => {
        console.log(name, photo);
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        } )
    }

    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () =>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const logOutUser = () =>{
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            if (currentUser) {
                //get a token and store it in client side
                const userInfo = {
                    email: currentUser?.email
                }
                axiosPublic.post('jwt', userInfo)
                .then(res =>{
                    if (res.data.token) {
                        localStorage.setItem('access-token', res.data.token)
                        setLoading(false)
                    }
                    
                })
            }
            //remove the token if user logout
            else{
                localStorage.removeItem('access-token')
                setLoading(false)
            }
            
        })
        return () => {
            return unSubscribe()
        }

    }, [axiosPublic])


    const authInfo = {
        createUser,
        signInUser,
        logOutUser,
        updateUserProfile,
        googleSignIn,
        user,
        loading,
        setUser

    }

    console.log(user);
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;