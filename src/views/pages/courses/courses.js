
// Chakra imports
import { Box, Button, Flex, Grid, Text, useColorModeValue } from "@chakra-ui/react";

// Custom components
import Banner from './components/Banner';
import General from "views/admin/profile/components/General";
import Notifications from "views/admin/profile/components/Notifications";
import Projects from "views/admin/profile/components/Projects";
import Storage from "views/admin/profile/components/Storage";
import Upload from "views/admin/profile/components/Upload";

// Assets
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avatar4.png";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import List from './components/List'
import  {db} from 'firebase.js'
import Card from "components/card/Card";
export default function Courses() {
  const [videos, setVideos] = useState([]);
  const [quiz, setQuiz] = useState([]);
 
     const{id} = useParams()
     const navigate = useHistory();
      
   
 
     // get courseList from   Spark/Master/CourseList
 
     const [courseList, setCourseList] = useState([])
     const [loading, setLoading] = useState(false)
 
 
     const getCourseList = async (id) => {
        
          
         let b = [];
         const q = query(
             collection(db, 'Spark/Master/CoursesList'),
           
         );
             
         const unsubscribe = onSnapshot(q, (querySnapshot) => {
             querySnapshot.forEach((doc) => {
                 let a = {
                     id: doc.id,
                     data: doc.data(),
                 };
                 b.push(a);
             });
              
              let c =  b.filter((a) => a.id === id);
               
             setCourseList(c) 
             
         }
         );
 
 
 
     }
 
     useEffect(() => {
         getCourseList(id);
     }, [id]);
 
  
         
 
  
     const getVideos = async (id) => {
         
          setLoading(true)
         let b = [];
     
         const q = query(
           collection(db, 'Spark/Master/CourseLectures'),
           where('courseId', '==', id)
         );
         const unsubscribe = onSnapshot(q, (querySnapshot) => {
           querySnapshot.forEach((doc) => {
             let a = {
               id: doc.id,
               data: doc.data(),
             };
             b.push(a);
           });
     
           setVideos(b);
          
           setLoading(false)
         });
       };
 
       
       useEffect(() => {
         getVideos(id);
         }, [id]);
 
         const getQuiz = async (id) => {
             
             setLoading(true)
             let b = [];
             
             const q = query(
               collection(db, 'Spark/Master/QuizList'),
               where('courseId', '==', id)
             );
             const unsubscribe = onSnapshot(q, (querySnapshot) => {
               querySnapshot.forEach((doc) => {
                 let a = {
                   id: doc.id,
                   data: doc.data(),
       
                 };
       
                 b.push(a);
               });
       
               setQuiz(b);
       
               
               setLoading(false)
             });
           };
       
       
             useEffect(() => {
                 getQuiz(id);
                 }, [id]);
 
 
 
         const redirectVideo = (id) => {
             
             navigate(`/video/${id}`);
           };
 
         
           const redirectQuiz = (id) => {
             
             navigate(`/quiz/${id}`);
           };
 
           const textColor = useColorModeValue("secondaryGray.900", "white");
           const textColorBrand = useColorModeValue("brand.500", "white");
  return (
    <Box pt={{ base: "120px", md: "80px", xl: "80px" }}> 
      <Box mb='50px'> 
      {courseList.map((course) => {
        return (
      <Banner  
      title={course.data.title}
      image = {course.data.image}
       />
        )
        })}
        </Box> 

            <Flex
              align={{ sm: "flex-start", lg: "center" }}
              justify='space-between'
              w='100%'
              px='22px'
              py='18px'>
                {loading ? <Text>Loading...</Text> :  videos.length === 0 ? <Text>No videos</Text> :
                 
              <Grid
                
                templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(1, 1fr)" }}
                gap={{ sm: "20px", md: "20px", lg: "30px" }}
                w='30%'>
                   <Text fontSize='xl' fontWeight='bold' color={textColor}>
                  Videos
                </Text>
                  {videos.sort((a, b) => a.data.index - b.data.index).map((item) => (
                    <List
                      key={item.id}
                       index={item.data.index}
                      videoName={item.data.videoName}
                      onClick={() => redirectVideo(item.id)}
                    />
                  ))}
                </Grid>
                }

            
            </Flex>
            
    
   
   
    </Box>
  );
}
