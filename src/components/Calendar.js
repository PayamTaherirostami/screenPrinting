import React from 'react'
import { useState,useEffect} from 'react';
import "../App.css"
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid' ;
import interactionPlugin ,{DateClickArg} from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import momentPlugin from '@fullcalendar/moment';
// import timeGridPlugin from "@fullcalendar/timegrid";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import Data from '../events.csv';
import Papa from 'papaparse'


export default function Calendar () {
  const [rowData, setRowData] = useState('');
  const [view,setView]=useState("timeGridWeek")
 

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(Data);
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csvData = decoder.decode(result.value);
      const parsedData = Papa.parse(csvData, { 
        header: true, 
        skipEmptyLines: true 
      }).data;
        setRowData(parsedData)
      }
      fetchData();
  }
  , []);

  const handleClick=(arg)=>{

    alert(`Location: ${arg.event.extendedProps.location}\nPo#: ${arg.event.extendedProps.PoNumber}\nPress: ${arg.event.extendedProps.press}\nQnt: ${arg.event.extendedProps.qnt}\nPuller? ${arg.event.extendedProps.puller}\n`)

  }
  

  // dayGridMonth


    return (
      <div className='calendar'>
      
      <FullCalendar 
        plugins={[ 
          dayGridPlugin, momentPlugin ,interactionPlugin, timeGridPlugin, listPlugin 
        ] }  
        // header={{
        //   left: "prev,next, today",
        //   center: "title",
        //   right: "dayGridMonth,timeGridWeek,timeGridDay"
        // }}
        editable={true}
       initialView={view}
       timeZone= 'PST'
       events={rowData}
       droppable= {true}
      //  allday={false}
       locales= {[ esLocale ]}
       locale= 'en'
       eventClick={handleClick}
       weekends={false}
       eventTextColor= "white"
       

  />
       </div>
    )
}
