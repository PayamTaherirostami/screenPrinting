
import { useState, useEffect, useCallback } from 'react'
// import { BiCalendar } from "react-icons/bi"
// import Search from "./components/Search"
// import AddAppointment from "./components/AddAppointment"
import Description from "./Description"
import Description2 from "./Description2"
import "../App.css"
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export default function Manatee() {
    const [myArr, setArr]=useState([])
    let [appointmentList, setAppointmentList] = useState([]);
    let [appointmentList2, setAppointmentList2] = useState([]);
    let [status, setStatus]= useState(true)
    let [query, setQuery] = useState("");
    let [sortBy, setSortBy] = useState("Name");
    let [orderBy, setOrderBy] = useState("asc");
    let [appointmentList3, setAppointmentList3] = useState([]);
    let [appointmentList4, setAppointmentList4] = useState([]);    
    const [appointmentList3b, setAppointmentList3b] = useState([]); 
    const [appointmentList4b, setAppointmentList4b] = useState([]); 
    const date= new Date()
const date2= new Date('Sun Jul 23 2023 19:56:00 GMT-0700 (Pacific Daylight Time)')


    
      const fetchData = useCallback(() => {
        fetch('./data2.json')
          .then(response => response.json())
          .then(data => {
            setAppointmentList(data)
          });
          fetch('./data3.json')
          .then(response => response.json())
          .then(data => {
            setAppointmentList2(data)
          });
      }, [])

      useEffect(() => {
        if (date > date2){
            setStatus(false)
          }
          if (date < date2){
            setStatus(true)
          }
        fetchData()
      }, [fetchData,appointmentList3,appointmentList4]);
    // const shuffle = (array) => { 
    //     return array.sort(() => Math.random() - 0.5); 
    //   }; 
     
      for (var a=[],i=0;i<15;++i) a[i]=i;

      // http://stackoverflow.com/questions/962802#962890
      function shuffle(array) {
        var tmp, current, top = array.length;
        if(top) while(--top) {
          current = Math.floor(Math.random() * (top + 1));
          tmp = array[current];
          array[current] = array[top];
          array[top] = tmp;
        }
        return array;
      }
      
    //   setArr(shuffle(a));
    //   console.log(a)
function p(){
//    console.log(a)
    let b= shuffle(a)
    for (var ab=[],i=0;i<8;++i) ab[i]=b[i];
    setArr(ab)

    // console.log(appointmentList)   

    ////inja bayad i ro az ab bekhune na az i e khodesh ********************************
    for (i=0;i<ab.length;++i){
        let w= appointmentList3.push(appointmentList[ab[i]])
        let p= appointmentList4.push(appointmentList2[ab[i]])
        setAppointmentList3(w)
       
        setAppointmentList4(p)
    }
    setAppointmentList3b(appointmentList3)
    setAppointmentList4b(appointmentList4)
    // console.log(ab)
    // console.log(appointmentList3)
    // console.log(appointmentList4)
    setAppointmentList3([])
    setAppointmentList4([])
}


  return (
    <>
    {status &&(
    <>
    <div className="ax">  
<img  src="/Capture.JPG" alt="d" title="d"></img>
{/* <h1 className=" text-5xl mb-3">Go */}

{/* <BiCalendar className="inline-block text-red-400 align-top" /> */}
{/* <a className="ml-2 text-blue-800" title= "Please visit our page" href="https://go.kotisdesign.com/"> Kotis</a></h1> */}
</div>
<button onClick={()=>p()} style={{height:30, color:"white", background:"grey", fontSize:20}}>Generate a New one</button>
<h2>Responsibilities:</h2>
<ul className="divide-y divide-gray-200">
  {appointmentList3b
    .map(appointment => (
      <Description key={appointment.id}
        appointment={appointment}
        myArr={myArr}

      />
    ))
  }
</ul>
<h2>Qualification:</h2>
<ul className="divide-y divide-gray-200">
  {appointmentList4b
    .map(appointment => (
      <Description2 key={appointment.id}
        appointment={appointment}
        myArr={myArr}
      />
    ))
  }
</ul>
</>
    )}
    {!status && (
      <>
      <p>This site can’t be reached, the link is expired.</p>
      </>
    )}

    </>
  )
}