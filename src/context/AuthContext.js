import { Storage } from "@capacitor/storage"; 
import {  IonSpinner }  from "@ionic/react";
import { createContext, useState, useEffect,  } from "react";




export const AuthContext = createContext();


const AuthContextProvider = (props) => {

    const [loggedIn, setLoggedIn] = useState(false);

    const [showLoading, setShowLoading] = useState(true);

    

    const [jwt, setJwt] = useState()

    useEffect(() => {

        getAuthenticated()

    }, [])


    const getAuthenticated = async () => {
        
        setShowLoading(true)

        const accessToken = await Storage.get({key : 'accessToken'})
         
        if (accessToken.value) {

            setLoggedIn(true);

            setJwt(accessToken.value)

            setShowLoading(false)

        } else { 

            setLoggedIn(false)

            setShowLoading(false)

        }

        // console.log(accessToken.value);

        // setShowLoading(false)

    }

    return(
         

        <>

        {showLoading 
        
        ? 
        <IonSpinner name='dots' style={{ display: 'block', margin: 'auto' }}isOpen={showLoading} /> 
        
        : 
        
        <AuthContext.Provider value={{loggedIn, setLoggedIn, jwt, setJwt}}>

        {props.children}  
    
        </AuthContext.Provider>

        }

        </> 
       
    )

}

export default AuthContextProvider;