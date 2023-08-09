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
import Data from '../events.csv';
import Papa from 'papaparse'


export default function Calendar () {
  const [rowData, setRowData] = useState('');
 

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

    alert(`Location: ${arg.event.extendedProps.location}\nPo#: ${arg.event.extendedProps.PoNumber}\nStart Time: ${arg.event.extendedProps.time1}\nEstimated Finish Time: ${arg.event.extendedProps.time2}\nPress: ${arg.event.extendedProps.press}\nQnt: ${arg.event.extendedProps.qnt}\nPuller? ${arg.event.extendedProps.puller}\n`)

  }

    return (
      <div className='calendar'>
      <FullCalendar 
        plugins={[ dayGridPlugin, momentPlugin ,interactionPlugin, timeGridPlugin, listPlugin ] }  
        editable={true}
       initialView="dayGridMonth"
       timeZone= 'PST'
       events={rowData}
       droppable= {true}
       locales= {[ esLocale ]}
       locale= 'en'
       eventClick={handleClick}
      //  weekends={false}
       eventTextColor= "white"
  />
       </div>
    )
}
