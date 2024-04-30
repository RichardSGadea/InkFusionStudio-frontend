import { useSelector } from "react-redux"
import "./Appointments.css"
import { getUserData } from "../../app/Slices/userSlice"
import { useEffect, useState } from "react"
import { bringAppointmentsUsers, bringAppointmentsWorkers } from "../../services/apiCalls"
import dayjs from "dayjs"

export const Appointments = () => {

    const [userAppointments, setUserAppointments] = useState([])
    const [allAppointments, setAllAppointments] = useState([])

    const userReduxData = useSelector(getUserData)
    const userType = userReduxData.decoded.userRole

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                if(userType === "client"){
                    const res = await bringAppointmentsUsers(userReduxData.token)
                    setUserAppointments(res)
                }else if (userType === "worker"){
                    const res = await bringAppointmentsWorkers(userReduxData.token)
                    setUserAppointments(res)
                }else{

                }

                
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppointments()
    }, [])


    return (

        <div className="container-fluid secondary">
            <div className="row appointmentsDesign">
                <div className="col-3">

                </div>
                <div className="col-6 d-flex justify-content-center align-items-start mt-2">
                    <table>
                        <thead>
                            <tr>
                                <th className="cellTable">Date</th>
                                <th className="cellTable">Hour</th>
                                {userType==="worker" && <th className="cellTable">Client</th>}
                                <th className="cellTable">Work</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userAppointments.map((element) => {
                                return (
                                    <tr key={element.id}>
                                        <td className="cellTable">{dayjs(element.appointmentDate).format("DD/MM/YYYY")}</td>
                                        <td className="cellTable">{dayjs(element.appointmentDate).format("hh:mm A")}</td>
                                        {userType==="worker" && <td className="cellTable">{element.client.firstName}</td>}
                                        <td className="cellTable">
                                            <ul key={element.id}>
                                                {(element.appointmentPortfolios).map((portfolio,index) => {
                                                    return(<li key={index}>{`${portfolio.name} ---- ${portfolio.price}€`}
                                                    </li>)
                                                })}
                                            </ul>
                                        </td>
                                    </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="col-3">

                </div>
            </div>
        </div>

    )

}