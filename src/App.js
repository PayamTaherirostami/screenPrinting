import { useState, useEffect, useCallback } from 'react'
import Search from "./components/Search"
import AppointmentInfo from "./components/AppointmentInfo"
import "../src/App.css"
import { BrowserRouter, Route, Switch ,Link} from 'react-router-dom';
import AdGenerator from "./components/AdGenerator"
// import Calendar from "./components/Calendar"
import ChatGPT from './components/ChatGPT';
import Calendar from './components/Calendar';
// import { Calendar } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
/// 
//

////
function App() {

  let [appointmentList, setAppointmentList] = useState([]);
  let [query, setQuery] = useState("");
  let [sortBy, setSortBy] = useState("Name");
  let [orderBy, setOrderBy] = useState("asc");

  const filteredAppointments = appointmentList.filter(
    item => {
      return (
        item.Name.toLowerCase().includes(query.toLowerCase()) ||
        item.Dep.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase())
      )
    }
  ).sort((a, b) => {
    let order = (orderBy === 'asc') ? 1 : -1;
    return (
      a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order : 1 * order
    )
  })

  const fetchData = useCallback(() => {
    fetch('./data.json')
      .then(response => response.json())
      .then(data => {
        setAppointmentList(data)
      });
  }, [])

  useEffect(() => {

    fetchData()
  }, [fetchData]);

  return (
    <BrowserRouter>
      <Switch>
      <Route exact path="/">
      <nav>
          <ul className="nav-links">
              <li> <Link to={{ pathname:"/dev" }}  > Maintenance</Link></li>
              <li> <Link to={{ pathname:"/dev" }}  > Documents</Link></li>
              <li> <Link to={{ pathname:"/dev" }}  > Tasks</Link></li>
              <li> <Link to={{ pathname:"/calendar" }}  > Calendar</Link></li>
          </ul>
      </nav>
      <h3>Welcome ...</h3>
      
      <nav>
                    <ul className="nav-links">
                        <li>Copyright 2023 &copy;</li>
                        <li>All Rights Reserved</li>
                     
                        <li> <a href="/dev" > TERM OF USE</a></li>
                        <li> <a href="https://www.pamiranindustries.com/author.html" > ABOUT AUTHOR</a></li>
   
                    </ul>
                </nav>
        </Route>
        <Route exact path="/dev"><p>This page is under development!</p></Route>
        <Route exact path="/kps-doc"> 
        <>   
          <div className="App container mx-auto mt-3 font-thin">
            <div className="ax">  
              <img  src="/Capture.JPG" alt="d" title="d"></img>          
            </div>
            <Search query={query}
              onQueryChange={myQuery => setQuery(myQuery)}
              orderBy={orderBy}
              onOrderByChange={mySort => setOrderBy(mySort)}
              sortBy={sortBy}
              onSortByChange={mySort => setSortBy(mySort)}
            />
            <ul className="divide-y divide-gray-200">
              {filteredAppointments
                .map(appointment => (
                  <AppointmentInfo key={appointment.id}
                    appointment={appointment}
                  />
                ))
              }
            </ul>
          </div>
        </>
        </Route>
        <Route exact path="/chat">
          <ChatGPT/>
        </Route>
        <Route exact path="/calendar">
          <Calendar/>
        </Route>
        <Route exact path="/generator">
          <AdGenerator/>
        </Route>

      </Switch>
    </BrowserRouter>

  )
}

export default App;
