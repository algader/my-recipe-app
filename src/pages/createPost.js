import { IonPage, IonHeader, IonContent, IonToolbar, IonTitle }  from "@ionic/react"

import Header from '../components/Header/Header'

const  createPosts = () => {

    return(

     <IonPage>

      <Header headerTitle="نشر منشور " defaultHref="all-posts"/> 

      <IonContent>

      </IonContent>

     </IonPage>

    )

}

export default   createPosts; 


