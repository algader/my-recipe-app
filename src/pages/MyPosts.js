import { 

  IonPage, 
  
  IonContent, 
  IonCard,
  IonImg,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCardTitle,
  IonCardSubtitle,
  IonSpinner,
  IonButton,
  IonButtons,
  IonIcon,
  useIonActionSheet,
  IonAlert
  

}  from "@ionic/react"

import Header from '../components/Header/Header'

import './styles/getAllPosts.css'

import axios from '../config/axios'

import { GET_MY_POSTS, DELETE_POST, } from "../config/urls"

import { useContext, useEffect, useState } from "react"

import { useHistory } from "react-router"

import { AuthContext } from "../context/AuthContext"

import {ellipsisVertical} from 'ionicons/icons'

import './styles/getMyPosts.css'




const  MyPosts = () => {

  const [showLoading, setShowLoading] = useState(false);
  const [posts, setPosts] = useState()
  const [postId, setPostId] = useState()
  const [showAlert, setShowAlert] = useState(false) 

  const [present, dismiss] = useIonActionSheet();
  
  const history = useHistory()

  const {jwt} = useContext(AuthContext);

  

  useEffect(() => {

    getPosts()

}, [])


  const getPosts = async () => {

    setShowLoading(true)

    try {

        await axios.get(GET_MY_POSTS , {

            headers: {

                Authorization:  jwt

            }

        }).then(res => {

            console.log(res);

            setPosts(res.data);

            setShowLoading(false)

        })

    } catch(e) {

        console.log(e.response);

        setShowLoading(false)

    }

}

const deletePost = async () => {

  setShowLoading(true)

  try {

      await axios.delete(DELETE_POST, {

          data: {

              'postId': postId

          },

          headers: {

              Authorization: jwt

          }

      }).then(res => {

          console.log(res);

          setShowLoading(false)

          getPosts()

      })

  } catch(e) {

      console.log(e.response);

      setShowLoading(false)

  }

}


  return(

   <IonPage>

     {showLoading
     
     ? 
     
     <IonSpinner name='dots' style={{ display: 'block', margin: 'auto' }} isOpen={showLoading} />
  
   : posts && 


  <>

    <IonAlert

            isOpen={showAlert}

            onDidDismiss={() => setShowAlert(false)}

            header={'تنبيه!'}

            message={'هل تود بالفعل حذف المنشور'}

            buttons={[

                {

                    text: "نعم",

                    handler: () => {

                        deletePost()
                        

                    }

                },

                {

                    text: "إلغاء",

                    role: "cancel"

                }

            ]}

            />


              <IonContent className="ion-padding">
       
      <Header headerTitle="منشوراتي"/> 
              

                  {posts.length > 0 
                  
                  ? 
                  
                  posts.slice().reverse().map((post) => {
                    
                     return(
                      
                      <IonCard key={post.id}>
              
                      <IonImg src={post.Post_Images[0].img_uri} />
      
                      <IonCardContent>
                          
                          <IonGrid>
                       
                            <IonRow className="ion-justify-content-between"> 
                               
                            <IonCardTitle className="post-title" color="primary">{post.title}</IonCardTitle>
                              
                             <IonButtons
                             
                             onClick={() => {
                              present([
                                  {
                                      text: "تعديل المنشور",
                                      handler: () => {
                                          history.push(`/my-recipe/my-posts/${post.id}`)
                                      }
                                  },
                                  {
                                      text: "الانتقال للمنشور",
                                      handler: () => {
                                          history.push(`/my-recipe/all-posts/${post.id}`)
                                      }
                                  },
                                  {
                                      text: "حذف المنشور",
                                      handler: () => {
                                          setPostId(post.id)
                                          setShowAlert(true)
                                      }
                                  },
                                  {
                                      text: "إلغاء",
                                      role: "cancel"
                                  }
                              ], 'تفاصيل المنشور')
                          }}
                             
                             >
                              
                              <IonIcon icon={ellipsisVertical}  className="post-icon"/>

                              </IonButtons> 

                            {/* <IonButton>

                            </IonButton> */}

                            </IonRow>
      
                          <IonCardSubtitle className="post-contents">{post.contents}</IonCardSubtitle>
      
                          </IonGrid>
       
                      </IonCardContent>
      
                      </IonCard>

                     )


                  })

                   : 

                <IonCard className="ion-padding ion-text-center">
                
                <IonCardTitle color="primary">لا يوجد منشورات لعرضها</IonCardTitle>

                </IonCard> 
              
              }
              

              </IonContent>

  </>

} 

                  </IonPage>

                  )

              }

export default MyPosts; 


