

import React, { useEffect, useState } from "react";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  useColorModeValue,
  SimpleGrid,
  Icon,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Spinner,
  Image,
  color,
} from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/marketplace/components/Banner";
import TableTopCreators from "views/admin/marketplace/components/TableTopCreators";
import HistoryItem from "views/admin/marketplace/components/HistoryItem";
import NFT from "components/card/NFT";
import Card from "components/card/Card.js";

// Assets
import Nft1 from "assets/img/nfts/Nft1.png";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft3 from "assets/img/nfts/Nft3.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft6 from "assets/img/nfts/Nft6.png";
import Avatar1 from "assets/img/avatars/avatar1.png";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar4 from "assets/img/avatars/avatar4.png";
import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";
import { useHistory, useParams } from "react-router-dom";
import { db } from "firebase.js";
import { collection, addDoc, where, getDocs, limit, doc, getDoc, query, onSnapshot } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from 'firebase.js';
import {v4 } from 'uuid'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Parser } from  'html-to-react'
import { FaEthereum } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
export default function Marketplace() {
  // Chakra Color Mode

  const textColorBrand = useColorModeValue("brand.500", "white");
  const [datas, setDatas] = useState([]);
  const [videos, setVideos] = useState([]);
  const [videoName, setVideoName] = useState([]);
  const [loading, setLoading] = useState(false);
  const {id } = useParams();

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  // const id = localStorage.getItem('activeVideoId');
  // localStorage.setItem('activeVideoId', id);
   console.log(id)
  const [desc, setDesc] = useState('');
 
  const [code, setCode] = useState('');
  const [type, setType] = useState('student');
   
  const [getTicket, setGetTicket] = useState([]);

  const [ticketId, setTicketId] = useState('');

  const [getResponses, setGetResponses] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState( null)
  const [errorMessage ,setErrorMessage] = useState('')
  const [loadingTicket, setLoadingTicket] = useState(false)
  const [url,setUrl] = useState("")
  const [imageUpload, setImageUpload] = useState(null);
  const [courseId, setCourseId] = useState('')
  const [showMore, setShowMore] = useState(false);

  const visibleVideos = showMore ? videos : videos.slice(0, 5);
 
  const [selectedVideo,setSelectedVideo] = useState(null);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [quiz , setQuiz] = useState([])
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useHistory();
  const textColorSecondary = "gray.400";
  const brandColor = useColorModeValue("brand.500", "white");
  const textColor = useColorModeValue("brands.900", "white");
  const bgItem = useColorModeValue(
    { bg: "white", boxShadow: "0px 40px 58px -20px rgba(112, 144, 176, 0.12)" },
    { bg: "navy.700", boxShadow: "unset" }
  );
  const textColorDate = useColorModeValue("secondaryGray.600", "white");
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 470,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
     
  };

 // using coursID get the course details 
  const getCourseDetails = async (id) => {
    let b = [];
    const docRef = doc(db, 'Spark/Master/CoursesList', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      b.push(docSnap.data());
      setDatas(b);
      setDesc(docSnap.data().description);
      setCode(docSnap.data().code);
      setType(docSnap.data().type);
      setCourseId(docSnap.data().courseId);
      setUrl(docSnap.data().url);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

        

  };

  console.log(datas)
  
  useEffect(() => {
    getCourseDetails(id);
    
  }, [id]);
 

  const getVideos = async (id) => {
     setLoading(true);
    const videosRef = collection(db, 'Spark/Master/CourseLectures');
    const q = query(videosRef, where('courseId', '==', id));
    const querySnapshot = await getDocs(q);
    const videos = [];
    querySnapshot.forEach((doc) => {
      videos.push(doc.data());
    });
   // first filter the videos by there index and then sort them by there index
    const sortedVideos = videos.filter((video) => video.index).sort((a, b) => a.index - b.index);
    setVideos(sortedVideos);
    // make the first video as active video
    setSelectedVideo(sortedVideos[0]);
    setLoading(false);
     
    const activeVideoId = localStorage.getItem('activeVideoId');
    if (activeVideoId) {
     const activeVideo = videos.find((video) => video.id === activeVideoId);
     
      if (activeVideo) {
        setSelectedVideo(activeVideo);
        setActiveVideoId(activeVideo.id);
      }
      
     }
      
  };
  
 
  
  useEffect(() => {
    getVideos(id);
  }, [id]);
  
  useEffect(() => {
    if (videos.length > 0) {
      setSelectedVideo(videos[0]);
      setActiveVideoId(videos[0].id);
    }
  }, [videos]);
    
  console.log(selectedVideo)

  const getVideo = async (id) => {
    const q = query(
      collection(db, 'Spark/Master/CourseLectures'),
      where('id', '==', id),
    );
    const querySnapshot = await getDocs(q);
    const video = querySnapshot.docs[0].data();
    setSelectedVideo(video);
    // after refreshing the page the active video will be the selected video
    setActiveVideoId(video.id);
    localStorage.setItem('activeVideoId', video.id);
  };
  
  const handleNext = () => {
    localStorage.setItem('activeVideoId', videos[0].id);
    let index = videos.findIndex((video) => video.id === selectedVideo.id);
    if (index === videos.length - 1) {
      index = 0;
    } else {
      index++;
    }
    setSelectedVideo(videos[index]);
    getVideo(videos[index].id);
    
    setActiveVideoId(videos[index].id);
  
  };
  
  const handlePrevious = () => {
    localStorage.setItem('activeVideoId', videos[0].id);
    let index = videos.findIndex((video) => video.id === selectedVideo.id);
    if (index === 0) {
      index = videos.length - 1;
    } else {
      index--;
    }
    setSelectedVideo(videos[index]);
    getVideo(videos[index].id);
    // make the first video as active video id and set the current video index to the index of the video
   
 
  };
  

// 
 
 
// get the quiz form the courseId 
  const getQuiz = async (id) => {
    let b = [];
            
    const q = query(
      collection(db, 'Spark/Master/QuizList'),
      where('courseId', '==', id)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let a = {
        id: doc.id,
        data: doc.data(),
      };
      b.push(a);
    });
    setQuiz(b);


  }

  useEffect(() => {
    getQuiz(id);
  }, [id]);

  
  console.log(quiz)

 const redirectQuiz = (id) => {
     navigate.push(`/admin/quiz/${id}`);
  };
   



 
  return (
    <Box    pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
   
      {loading ? (
       <Flex
       justifyContent='center'
       alignItems='center'
       height='calc(100vh - 300px)'>
       <Spinner color='brand.500' size='xl' />
     </Flex>
      ) : (
        
      <Grid 
        mb='20px'
        
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.38fr" }}
        gap={{ base: "20px", xl: "10px" }}
        display={{ base: "block", xl: "grid" }}>
         <Box  style={{
              position: "relative",
              overflow: "hidden",
            
              
         }}>
            {selectedVideo && (
          <Box  gridArea={{ xl: "1 / 1 / 2 / 2", "2xl": "1 / 1 / 2 / 2" }}>
        
        <Flex
          flexDirection='column'
          gridArea={{ xl: "1 / 1 / 2 / 2", "2xl": "1 / 1 / 2 / 2" }}>
                

                <Box
  bgSize='cover'
  borderRadius='30px'
  position='relative'
  pb={{ base: "56.25%", md: "30px", lg: "56.25%" }}
>
  {selectedVideo ? (
    <iframe
      src={selectedVideo.url}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '30px' }}
    />
  ) : (
      // check if the video is not available then show text
  <div></div>
  )}
    


</Box>

   
            <Flex direction='column'>
            <Flex
              mt='45px'
              mb='20px'
              justifyContent='space-between'
              direction={{ base: "row", md: "row" }}
              align={{ base: "start", md: "center" }}>
              <Text style={{
                color:'#707EAE'
              }} fontSize='2xl' ms='24px' fontWeight='700'>
                {selectedVideo.videoName}
              </Text>
              <Flex alignItems='center' mt={{ base: "5px", md: "0" }}>
    <Link  style={{
      color:'#707EAE'
    }} fontWeight='500' mr={{ base: "24px", md: "44px" }} to='#art'>
   
      {
        videos.findIndex((video) => video.id === selectedVideo.id) + 1
      }/{videos.length}
    </Link>
    <Button mr='10px' size='sm' variant='outline'  onClick={handlePrevious}>
      <Icon as={IoIosArrowBack} />
    </Button>
    <Button size='sm' variant='outline'  onClick={handleNext}>
      <Icon as={IoIosArrowForward}  />
    </Button>
  </Flex>
            </Flex>
          </Flex>

        </Flex>
        
{/*          
            <Tabs variant='soft-rounded' style={{marginLeft:'10px' , color:'#707EAE'}}>
  <TabList>
    <Tab>Notes</Tab>
    <Tab>Projects </Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
    <p style={{
       whiteSpace: 'break-spaces'
    }}>         
    Once you spend just a few hours learning the powerful proven Instagram marketing techniques, you will see why we are the recommend course. We have easy to follow step by step techniques to grow your followers and market your business <br/>

Your time will pay off by reaching thousands of new customers, and building a strong, trustworthy relationship through Instagram will skyrocket your brand awareness to a level beyond your expectations. You will have the tools to create quality content, grow your Instagram followers and market your business to these hyper-targeted customers. <br/>

When making a purchasing decision, people online use your social media presence as a measure of the quality, and trustworthiness of your business. Nothing speaks trust and quality louder than having a thousands of targeted, real, and loving Instagram followers on your profile (of which you can contact at any time!) Your profile will be professional and compelling and you will be using stories, live streaming and all the other new features Instagram releases. 
    </p>
    </TabPanel>
    <TabPanel>
    <div className="mt-2">
        <h1 className="text-2xl font-medium">Description</h1>
        {selectedVideo.description ? (
          <div className="mt-4">{Parser().parse(selectedVideo.description)}</div>
        ) : (
          <p className="mt-4">{selectedVideo.description || 'No Projects Avalibale for this section '}</p>
        )}
      </div>
    </TabPanel>
  </TabPanels>
</Tabs> */}
      </Box>
            )}
          </Box>
<Flex
  flexDirection="column"
  gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
> 
<Card mb="5px" mt="px" mx="auto" maxW="410px">
     

       

     <Box>
  {datas.map((data) => (
    <>
    <Flex  align="center" w="100%" justify="space-between" mb="10px">
      <Text color={textColorPrimary} fontWeight="bold" fontSize="2xl" mb="px">
        What you’ll learn
      </Text>
    </Flex>
    <Text color={textColorPrimary} fontSize="md" mr="16px" mb="5px">
      {data.description}
    </Text>
    </>
  ))}
</Box>


    </Card>
  <Card mb="5px" mt="px" mx="auto" maxW="410px">
    <Flex align="center" w="100%" justify="space-between" mb="10px">
      <Text color={textColorPrimary} fontWeight="bold" fontSize="2xl" mb="px">
        Topics
      </Text>
    </Flex>
    {visibleVideos
      .map((video, index) => {
        
          return (
            <Flex direction={{ base: "column" }} justify='center'>
            <Flex position='relative' align='center' gap="18px">
            <Button size="sm" variant="outline" mt="4px">
                {video.index}
              </Button> 
              <Flex
                direction='column'
                w={{ base: "70%", md: "100%" }}
                me={{ base: "4px", md: "32px", xl: "10px", "3xl": "32px" }}>
                <Text
                   style={{
                    color:'#707EAE', 
                    whiteSpace: 'break-spaces' ,
                    cursor:'pointer'
                    }}
                  fontSize={{
                    base: "md",
                  }}
                  mb='5px'
                  fontWeight='bold'
                  me='14px' 
                  onClick={() => getVideo(
                    video.id
                    
                  )}
                  >
                    {selectedVideo && selectedVideo.id === video.id ? (
                      <Text style={{
                        color:'green'
                      }}
                      >{video.videoName}</Text>
                    ) : (
                      <Text>{video.videoName}</Text>
                    )}


                </Text>
                <Text
                  color='secondaryGray.600'
                  fontSize={{
                    base: "sm",
                  }}
                  fontWeight='400'
                  me='14px'>
                
                </Text>
              </Flex>
              <Button size="sm" variant="outline" mt="4px">
                <Icon as={IoIosArrowForward} />
              </Button>
              <Text ms='auto' fontWeight='700' fontSize='sm' color={textColorDate}>
                
              </Text>
            </Flex>
          </Flex>
          );
        
      })}
    {!showMore && videos.length > 5 && (
      <Button onClick={() => setShowMore(true)}>Show more</Button>

    )}
    {showMore && (
      <Button onClick={() => setShowMore(false)}>Show less</Button>
    )}
    
  </Card>
 
    <Card mb="px" mt="px" mx="auto" maxW="410px">
  {quiz.length > 0 ? (
    <>
      <Text
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='2xl'
        mt='10px'
        mb='4px'
      >
        Quiz
      </Text>
      {quiz.map((quiz) => (
        <Card mb="px" mt="px" mx="auto" maxW="410px">
          <Flex align='center' direction={{ base: "column", md: "row" }} justifyContent='space-between' >
          <Image h='80px' w='80px' src='https://thumbs.dreamstime.com/z/male-hand-holding-megaphone-quiz-time-speech-bubble-loudspeaker-banner-business-marketing-advertising-vector-125104939.jpg' borderRadius='8px' me='20px' />
          <Box mt={{ base: "10px", md: "0" }}>
            <Text
               style={{
                color:'#707EAE',
               }}
              fontWeight='500'
              fontSize='md'
              mb='4px'>
              {quiz.data.quiz_name}
            </Text>
            {/* <Text
              fontWeight='500'
              color={textColorSecondary}
              fontSize='sm'
              me='4px'>
              Project # •{" "}
              <Link fontWeight='500' color={brandColor} fontSize='sm'>
                See project details
              </Link>
            </Text> */}
          </Box>
          <Button size='sm'    variant='darkBrand'
                color='white'
                fontWeight='500'
                onClick={() => {
                  redirectQuiz(quiz.id);
                
                }}
           >
             Start Quiz
          </Button>

        </Flex>
        </Card>
      ))}
    </>
  ) : (
    <>
      <Text
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='2xl'
        mt='10px'
        mb='4px'
      >
       Quiz
      </Text>
      <Text color={textColorPrimary} fontSize='md' mb='4px'>
        No Quiz Avaliable
      </Text>
    </>
  )}
</Card>


</Flex>


      
      </Grid>
       
      )}
    </Box>
  );
}
