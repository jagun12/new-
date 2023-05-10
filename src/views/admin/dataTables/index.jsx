
import {
  Box,
  Button,
  Flex,
  Progress,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable";
import CheckTable from "views/admin/dataTables/components/CheckTable";
import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "views/admin/dataTables/variables/columnsData";
import tableDataDevelopment from "views/admin/dataTables/variables/tableDataDevelopment.json";
import tableDataCheck from "views/admin/dataTables/variables/tableDataCheck.json";
import tableDataColumns from "views/admin/dataTables/variables/tableDataColumns.json";
import tableDataComplex from "views/admin/dataTables/variables/tableDataComplex.json";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, Timestamp, where } from 'firebase/firestore';
import { db } from  'firebase.js'
import Card from "components/card/Card";
import { CircularProgressbar , buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Settings() {
     const {id } = useParams();
     console.log(id)
     const [quiz, setQuiz] = useState([]);
     
     const [index, setIndex] = useState(0);
     const [score, setScore] = useState(0);
     const [answered, setAnswered] = useState(false);
     const [finished, setFinished] = useState(false);
     const [getQuiz, setGetQuiz] = useState([]) 
     const [error, setError] = useState('');
     const [loading, setLoading] = useState(false);
   
     const textColor = useColorModeValue("secondaryGray.900", "white");

    const percentage = 66 
     const getQuizQuestions = async (id) => {
         setLoading(true)
          let b = []
       const q = query(
         collection(db, 'Spark/Master/QuizQuestions'),
         where('quizId', '==', id)
       );
       const unsubscribe = onSnapshot(q, (querySnapshot) => {
         querySnapshot.forEach((doc) => {
           let a = {
             id: doc.id,
             data: doc.data(),
           };
           b.push(a);
         });
         // b.filter({a,b } => a.data.userEmail === b.data.userEmail)
         setQuiz(b);
          setLoading(false)
       }
       );
     };
   
     useEffect(() => {
       getQuizQuestions(id)
     }, [id]);
     
     console.log(quiz)
       
     //check answer from  quizQuestions collection in firebase and update score
     
    
     const selected = ( id) => {
       reset();
       document.getElementById(id).style.color = " #2ECC71 ";
     }
      
     const reset = () => {
       document.getElementById("opt1").style.color = "#273746 ";
       document.getElementById("opt2").style.color = "#273746 ";
       document.getElementById("opt3").style.color = "#273746 ";
       document.getElementById("opt4").style.color = "#273746 ";
     }
   
     const checkAnswer = (answered) => {
       if (quiz[index]?.data.answer === answered) {
         setScore(score + 1);
       }
       setAnswered(true);
     };
   
    
   
    
    const nextQuestion = () => {
     if (index < quiz.length - 1) {
       if (answered) {
         setIndex(index + 1);
         setAnswered(false);
         setError(null);
       
       } else {
         setError('Please select an option for this question');
       }
     } else {
       setFinished(true);
       addScore();
     }
   };
   
     
   
     const prevQuestion = () => {
       if (index > 0) {
         setIndex(index - 1);
         setAnswered(false);
       }
       
     };
   
     // add score to user collection in firebase
   
     const  addScore = async () => {
        
       let email = localStorage.getItem('email')
   
       let a = {
         score: score,
         quizId: id,
         userEmail: email,
         takenQuizOn: Date.now(),
   
         totalQuestions: quiz.length
       }
    
   
       try {
         const docRef = await addDoc(collection(db, "Spark/Master/QuizScores"), a);
         console.log("Document written with ID: ", docRef.id);
         console.log("score added")
       } catch (e) {
         console.error("Error adding document: ", e);
   
   
       }
   
     }
   
      //get quiz report from quizId 
   
       const getQuizReport = async (id) => {
         const q = query(
           collection(db, 'Spark/Master/QuizScores'),
           where('quizId', '==', id)
         );
         const doc = await getDocs(q);
         let b = []
         doc.forEach((doc) => {
           let a = {
             id: doc.id,
             data: doc.data(),
   
           }
           b.push(a)
         })
         setGetQuiz(b)
       }
   
       useEffect(() => {
         getQuizReport(id)
       }, [id]);
    
       
       // rest quiz  and naigate quiz

        const resetQuiz = () => {
          setIndex(0);
          setScore(0);
          setAnswered(false);
          setFinished(false);


        }

     
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
           {loading ? (
        <Flex
          justifyContent='center'
          alignItems='center'
          height='calc(100vh - 300px)'>
          <Spinner color='brand.500' size='xl' />
        </Flex>
      ) : (
        <Box>
           <Text px='25px' mb='20px'  fontSize='28px' fontWeight='700'>
              Quiz 
                </Text>
                  {!finished ? (
        <Card
        direction='column'
        w='100%'
        px='0px'
        overflowX={{ sm: "scroll", lg: "hidden" }}>
           
        <Flex px='25px'   mb='20px' align='center'>
          <Text
            color={textColor}
            fontSize='22px'
            fontWeight='700'
             style={{
               alignItems: "center",
             }}
            lineHeight='100%'>
            {quiz[index]?.data.question}
          </Text>
          
        </Flex>
              <Text px='25px' mb='20px' style={{
                color: "#3498DB",
              }}  fontSize='18px' fontWeight='700'>
              Question {index + 1} of {quiz.length}
                </Text>
                <Flex px='25px ' direction={{ base: "column" }} justify='center'  style={{
          display: quiz[index]?.data.optionA ? 'block' : 'none'
         }} >
        <Flex position='relative' align='center'>
        <Button size="sm" variant="outline" mt="4px">
                A
              </Button> 
          <Flex
           style={{
            marginLeft: "20px",
            marginTop: "10px",
            cursor: "pointer",
          }}
            direction='column'
            w={{ base: "70%", md: "100%" }}
            me={{ base: "4px", md: "32px", xl: "10px", "3xl": "32px" }}>
            <Text
              color={textColor}
              fontSize={{
                base: "md",
              }}
              mb='5px'
              fontWeight='bold'
              me='14px' 
              id="opt1"
              onClick={
                  
                () => { 
                   selected("opt1")
                   checkAnswer(quiz[index]?.data.optionA)
                }
              } 
               >
              {quiz[index]?.data.optionA}
            </Text>
          
          </Flex>
         
          
        </Flex>
      </Flex> 
      <Flex px='25px '  direction={{ base: "column" }} justify='center'  style={{
          display: quiz[index]?.data.optionB ? 'block' : 'none'
         }} >
        <Flex position='relative' align='center'>
        <Button size="sm" variant="outline" mt="4px">
                 B
              </Button> 
          <Flex
            direction='column' 
              style={{
                marginLeft: "20px",
                marginTop: "10px",
                cursor: "pointer",
              }}
            w={{ base: "70%", md: "100%" }}
            me={{ base: "4px", md: "32px", xl: "10px", "3xl": "32px" }}>
            <Text
              color={textColor}
              fontSize={{
                base: "md",
              }}
              id="opt2"
              mb='5px'
              fontWeight='bold'
              me='14px'
              onClick={
                 () => {
                    selected("opt2")
                    checkAnswer(quiz[index]?.data.optionB)
                  }
              }
              >
              {quiz[index]?.data.optionB}
            </Text>
          
          </Flex>
         
          
        </Flex>
      </Flex>
      <Flex px='25px ' direction={{ base: "column" }} justify='center'  style={{
          display: quiz[index]?.data.optionC ? 'block' : 'none'
         }} >
        <Flex position='relative' align='center'>
        <Button size="sm" variant="outline" mt="4px">
                C
              </Button> 
          <Flex
           style={{
            marginLeft: "20px",
            marginTop: "10px",
            cursor: "pointer",
          }}
            direction='column'
            w={{ base: "70%", md: "100%" }}
            me={{ base: "4px", md: "32px", xl: "10px", "3xl": "32px" }}>
            <Text
              color={textColor}
              fontSize={{
                base: "md",
              }}
              id="opt3"
              mb='5px'
              fontWeight='bold'
              me='14px'onClick={
                  
                () => { 
                   selected("opt3")
                   checkAnswer(quiz[index]?.data.optionC)
                } 
              }
                >
              {quiz[index]?.data.optionC}
            </Text>
          
          </Flex>
         
          
        </Flex>
      </Flex>
      <Flex px='25px ' direction={{ base: "column" }} justify='center'  style={{
          display: quiz[index]?.data.optionD ? 'block' : 'none'
         }} >
        <Flex position='relative' align='center'>
        <Button size="sm" variant="outline" mt="4px">
                D
              </Button> 
          <Flex
           style={{
            marginLeft: "20px",
            marginTop: "10px",
            cursor: "pointer",
          }}
            direction='column'
            w={{ base: "70%", md: "100%" }}
            me={{ base: "4px", md: "32px", xl: "10px", "3xl": "32px" }}>
            <Text
              
              fontSize={{
                base: "md",
              }}
              id="opt4"
              mb='5px'
              fontWeight='bold'

              me='14px' 
              onClick={
                  
                () => { 
                   selected("opt4")
                   checkAnswer(quiz[index]?.data.optionD)
                }
              }
              >
              {quiz[index]?.data.optionD}
            </Text>
          
          </Flex>
         
          
        </Flex>
      </Flex>
         <Text px ='25px' mt='20px' >
         {error && <p style={{
            color: "red",
         }} >{error}</p>}
         </Text>

<Flex justifyContent={{ base: "center", md: "flex-end" }} gap='10' marginRight='1.5' >
                <Button
                  variant='brand'
                  fontWeight='500'
                   style={{
                    display: index === 0 ? 'none' : 'block'
                   }}
                   
                  type="button"
                  onClick={prevQuestion}
                 
                >
                  Previous
                </Button>
                <Button

variant='brand'
fontWeight='500'
                  type="button"
                  onClick={() => {
                    reset()
                    nextQuestion();
                     
                  }}
                  disabled={index === quiz.length + 1}
                >
                  Next
                </Button>
              </Flex>
               
                </Card>
                  ) : (
               <Box mx='auto' >
             
              <Box mx='auto'>
                 <Text textAlign='center' mb='10' fontWeight='bold' fontSize='2xl' >Your Score </Text>
              
                <Box  mx='auto' style={{ width: 150, height: 200 }}>
  <CircularProgressbar  text={`${score}`} styles={buildStyles({
      textSize: '29px',
   })}
   />
</Box>
         
              </Box>
              <Box mx='auto' mt='10' textAlign='center'  >
              <Button
              variant="brand"
              fontWeight='500' 
              type="button"
              mx='auto'
              onClick={() => {
                resetQuiz()
                 
              }}
            >
              Retake Quiz
            </Button>
              </Box>


              </Box>
                  )}
                  </Box>
                  
                
      )}
            
          
    </Box>
  );
}
