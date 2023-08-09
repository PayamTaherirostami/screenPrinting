// import { BiTrash } from "react-icons/bi"
import '../App.css';


const AppointmentInfo = ({ appointment, onDeleteAppointment }) => {
  let number = parseInt(appointment.id)+1
  return (
    <li className="name">
      <div className="flex-grow">
        <div className="flex items-center">
          <span className="name">      
            <a title="Click here to download the pdf" href={appointment.link}> {appointment.Name}</a>
          </span>
        </div>
        <div><b className="d">Department:</b> {appointment.Dep}</div>
        {/* <div className="leading-tight">{appointment.aptNotes}</div> */}
      </div>
    </li>
  )
}

export default AppointmentInfo