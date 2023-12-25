import { IonPage,  IonContent, IonIcon, IonList, IonItem, IonLabel, IonInput, IonButton, IonRouterLink, IonLoading, IonAlert  }  from "@ionic/react"

import Header from "../components/Header/Header";

import { logIn } from "ionicons/icons";

import './styles/login.css'

import {  useContext, useState  } from "react";

import axios from '../config/axios';

import { LOGIN_URL } from "../config/urls";

import {Storage} from '@capacitor/storage';

import { useHistory } from "react-router";

import { AuthContext } from "../context/AuthContext";


      const  Login = () => {

        const [email, setEmail] = useState();

        const [password, setPassword] = useState();

        const [showLoading, setShowLoading] = useState(false); 

        const [showAlert, setShowAlert] = useState(false);

        const {setLoggedIn, setJwt} = useContext(AuthContext)


        const history = useHistory()
         
        // error i serach for it one week 
        
    //     const onSubmit = async () => {
          
    //       setShowLoading(true)

    //       const logInForm = {

    //         email,

    //         password

    //     }
           
    //       try {

    //         await axios.post(LOGIN_URL, logInForm).then(res => {

    //             Storage.set({

    //                 key: 'accessToken',

    //                 value: res.data.accessToken

    //             });

    //             setLoggedIn(true);

    //             setJwt(res.data.accessToken)

    //             history.push('/my-recipe/all-posts') 

    //             // console.log(res.data.accessToken); 

    //             setShowLoading(false)

    //         })
          
    //             // const response = await axios.post(LOGIN_URL, logInForm);
          
    //             // Storage.set({
    //             //   key: "accessToken",
    //             //   value: response.data.accessToken,
    //             // });
          
    //             // setLoggedIn(true);
    //             // setJwt(response.data.accessToken);
          
    //             // history.push("/my-recipe/all-posts");
              
            

    //     } catch(e) {

    //         if (e.response.status === 401) {

    //             setShowAlert(true)

    //             setShowLoading(false)

    //         }else {

    //             console.log(e.response);

    //             setShowLoading(false)

    //         }

    //     }
    //  }

    const onSubmit = async () => {

        setShowLoading(true);

      
        const logInForm = {

          email,

          password,

        };

      
        try {

          const response = await axios.post(LOGIN_URL, logInForm);

      
          Storage.set({

            key: "accessToken",

            value: response.data.accessToken,

          });

      
          setLoggedIn(true);

          setJwt(response.data.accessToken);

          history.push("/my-recipe/all-posts");

      
          setShowLoading(false);

        } catch (e) {

          console.error("Login Error:", e);

      
          if (e.response) {

            console.error("Response Status:", e.response.status);

          }

      
          setShowLoading(false);

        }

      };

      

      


            return(

            <IonPage>
             
             {showLoading 
             
             ? 
             
             <IonLoading isOpen={showLoading} />
            
             :
             
             <>

          <IonAlert

            isOpen={showAlert}

            // onDidDismiss={() => {setShowAlert(false)}}

            header="تنبيه!"

            message="البريد الإلكتروني أو كلمة المرور غير صحيح"

            buttons={[

                {

                    text: "موافق",

                    role: 'ok'

                }

            ]}

            />
               
              <Header headerTitle="تسجيل الدخول" />

                <IonContent>

                <IonIcon icon={logIn} className="icon" />

                <IonList>

                    <IonItem className="ion-margin-bottom">

                        <IonLabel position="floating" color="warning">البريد الإلكتروني</IonLabel>

                        <IonInput  value={email} onIonChange={(e) => {setEmail(e.target.value)}}  />


                    </IonItem>

                    <IonItem>

                        <IonLabel position="floating" color="warning">كلمة المرور</IonLabel>

                        <IonInput type="password" value={password} onIonChange={(e) => {setPassword(e.target.value)}} />
                      

                    </IonItem>

                </IonList>

                <div className="ion-text-center btn">

                              <IonButton onClick={() => {onSubmit()}}>تسجيل الدخول</IonButton>

                              <IonRouterLink routerLink="/account/register" className="router-link" color="warning">تسجيل مستخدم</IonRouterLink>

                          </div>

                </IonContent> 

             </> 


            }


            </IonPage>

            )
            

     }

export default Login; 


