
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  useColorModeValue,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import Banner from  './components/Banner'
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, { useEffect, useState } from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import NFT from "components/card/NFT";
import Card from "components/card/Card.js";
import { collection, getDoc, getDocs, onSnapshot, query, where, doc } from 'firebase/firestore';
import { useHistory, useNavigate, useParams } from 'react-router-dom';
import { db } from 'firebase.js';
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
export default function UserReports() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
    
  const [email, setEmail] = useState('');
  const [coursesID, setCoursesID] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [enrollment, setEnrollment] = useState({});
  const [error , setError] = useState('')

  localStorage.setItem('courseId', coursesID);

  const navigate = useHistory();

  const getData = async (mail) => {
      const usersRef = collection(db, 'Spark/Master/EnrolledStudents');
      const q = query(usersRef, where('email', '==', mail.toLowerCase()));
      
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
          getCourse(doc.data().courseId, doc.data().enrolled_on, doc.data().expires_on);
      });
  };


  useEffect(() => {
     
 
      const email = localStorage.getItem('email')

      setEmail(email);
      getData(email);
  }, []);

const getCourse = async (id, enrolled_on, expires_on) => {
setLoading(true);
const response = await getDoc(doc(collection(doc(collection(db, "Spark"), 'Master'), 'CoursesList'), id));

let a = {
  id: response.id,
  data: response.data(),
  enrolled_on,
  expires_on
};

setCourses((courses) => [...courses, a]);

if (enrollment.courseId === id) {
  setEnrollment({ ...enrollment, enrolled_on, expires_on });
}

setLoading(false);
};

  const redirectCourse = (id, expires_on, enrolled_on) => {
      const expiresDate = new Date(expires_on);
      const enrolledDate = new Date(enrolled_on);
      const currentDate = new Date();

      if (expiresDate < currentDate) {
          setError(`Course has expired on ${expires_on}`);
          return;
      }
       
       
       navigate.push(`/admin/videos/${id}`);
       
  };

 
        

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
       <Banner email={email}/>
       {loading ? (
        <Flex
          justifyContent='center'
          alignItems='center'
          height='calc(100vh - 300px)'>
          <Spinner color='brand.500' size='xl' />
        </Flex>
      ) : (

       <Flex direction='column'>
            <Flex
              mt='45px'
              mb='20px'
              justifyContent='space-between'
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}>
              <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                Courses 
              </Text>
              
            </Flex>

           
            <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>
            
            {courses.sort((a, b) => a.data.index - b.data.index).map((item) => (
               // pass props to the card component
                <NFT 
                  

                  key={item.id}
                  
                  id={item.id}
                  title={item.data.title}
                  description={item.data.description}
                  image={item.data.image}
                  expires_on={item.expires_on}
                  enrolled_on={item.enrolled_on} 
                   redirectCourse={redirectCourse}
                  />
            ))}
            </SimpleGrid>
           
          </Flex>
      )}
    </Box>
  );
}
