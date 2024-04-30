import { useSelector } from "react-redux"
import "./Appointments.css"
import { getUserData } from "../../app/Slices/userSlice"
import { useEffect, useState } from "react"
import { bringAppointmentsUsers } from "../../services/apiCalls"

export const Appointments = () => {

    const [userAppointments, setUserAppointments] = useState([])
    const [allAppointments, setAllAppointments] = useState([])

    const userReduxData = useSelector(getUserData)
    const userType = userReduxData.decoded.userRole

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await bringAppointmentsUsers(userReduxData.token);
                setUserAppointments(res)
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppointments()
    }, [])


    return (

        <div className="container-fluid secondary w-100">
            <div className="row">
                <div className="col-2">

                </div>
                <div className="col-8">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Hour</th>
                                <th>Work</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userAppointments.map((element) => {
                                return (
                                    <tr key={element.id}>
                                        <td>{element.appointmentDate}</td>
                                        <td>{element.appointmentDate}</td>
                                        <td>
                                            <ul key={element.id}>
                                                {(element.appointmentPortfolios).map((portfolio,index) => {
                                                    return(<li key={index}>{`${portfolio.name}____${portfolio.price}€`}
                                                    </li>)
                                                })}
                                            </ul>
                                        </td>
                                    </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="col-2">

                </div>
            </div>
        </div>

    )

}