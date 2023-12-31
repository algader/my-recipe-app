import { 
  
  IonPage, 

   IonContent, 
   
   IonSpinner,

   IonAlert,



  }  from "@ionic/react"
import Header from "../components/Header/Header";
import './styles/profile.css';
import { useContext, useEffect, useState } from "react";
import axios from '../config/axios';
import { PROFILE_URL, PROFILE_UPDATE_URL } from "../config/urls";
import { AuthContext } from "../context/AuthContext";
import UserDetails from "../components/UserProfile/UserDetails";
import { usePhotoGallery } from "../hooks/usePhotoGallery";
import UserAvatar from "../components/UserProfile/UserAvatar"; 




const  Profile = () => {

  const [showLoading, setShowLoading] = useState(false);
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [userImg, setUserImg] = useState()
  const [password, setPassword] = useState()
  const [showAlert, setShowAlert] = useState(false)


  const {jwt} = useContext(AuthContext);

  // const {takePhoto,  blobUrl} = usePhotoGallery() 

  useEffect(() => {

    getProfile();

}, [])

// useEffect(() => {

//   setUserImg(blobUrl)
  
// }, [blobUrl])


  const getProfile = async () => {

    setShowLoading(true);

    try{

      await axios.get(PROFILE_URL, {

        headers: {

          authorization: jwt

        }

      }).then(res => {

        console.log(res.data)

        setName(res.data.name)

        setEmail(res.data.email)

        setUserImg(res.data.img_uri)

        setShowLoading(false)

      })


    }catch(e){

      console.log(e.response)

      setShowLoading(false)

    }
  }

  const onSubmit = async () => {
    
    setShowLoading(true)

    const updateForm = {

      'name': name,

      'password': password

    }

    try{

      await axios.put(PROFILE_UPDATE_URL, updateForm, {

        headers: {
          Authorization: jwt

        }

      }).then(res => {

        console.log(res);

        setShowLoading(false)

      })

    }catch(e){

     console.log(e.response);

     setShowLoading(false)

    }

  }

    return(

     <IonPage>

          {showLoading
          
          ?
          
          <IonSpinner name='dots' style={{ display: 'block', margin: 'auto' }} isOpen={showLoading} />
          
          :
            <>

            <IonAlert 

            isOpen={showAlert}

            header="تنبيه!"

            message="هل تريد بالفعل تعديل البيانات الشخصية؟"

            onDidDismiss={() => {setShowAlert(false)}}

            buttons={[

                {

                    text: "موافق",

                    handler: () => {onSubmit()}

                },

                {

                    text: "إلغاء",

                    role: "cancel"

                }

            ]}

            />

             
             <Header headerTitle="صفحة المستخدم"/>

            <IonContent className="ion-padding">
              
            <UserAvatar userImg={userImg} />

              <UserDetails name={name} email={email} userName={setName} password={setPassword} showAlert={setShowAlert} />              

            </IonContent>

            </>
        }

     </IonPage>

    )

}

export default  Profile; 


