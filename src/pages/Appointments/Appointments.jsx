import { useSelector } from "react-redux"
import { getUserData } from "../../app/Slices/userSlice"
import { useEffect, useState } from "react"
import { bringAllAppointments, bringAppointmentsUsers, bringAppointmentsWorkers } from "../../services/apiCalls"
import dayjs from "dayjs"
import Card from 'react-bootstrap/Card';
import "./Appointments.css"

export const Appointments = () => {

    const [userAppointments, setUserAppointments] = useState([])
    const [totalPages, setTotalPages] = useState()
    const [currentPage, setCurrentPage] = useState(1)

    const userReduxData = useSelector(getUserData)
    const userType = userReduxData.decoded.userRole

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                if (userType === "client") {
                    const res = await bringAppointmentsUsers(userReduxData.token)
                    console.log(res);
                    setUserAppointments(res)
                } else if (userType === "worker") {
                    const res = await bringAppointmentsWorkers(userReduxData.token)
                    console.log(res);
                    setUserAppointments(res)
                } else {
                    const res = await bringAllAppointments(userReduxData.token, currentPage)
                    console.log(res);
                    setUserAppointments(res.appointments)
                    setTotalPages(res.total_pages)
                }


            } catch (error) {
                console.log(error);
            }
        }
        fetchAppointments()
    }, [currentPage])

    return (

        <div className="container-fluid appointmentsDesign bg-secondary">
            <div className="row">
                <div className="col-3 bg-secondary p-0">
                </div>
                <div className="col-6 p-0">
                    <div className="d-flex flex-column justify-content-start align-items-start bg-secondary">
                        {userAppointments.map((element) => {
                            return (
                                
                                    <Card key={element.id} className="w-100 m-1" border="warning" style={{ width: '18rem' }}>
                                        <Card.Header>Appointment</Card.Header>
                                        <Card.Body>
                                            <Card.Title>{`${dayjs(element.appointmentDate).format("DD/MM/YYYY")}  ---------  ${dayjs(element.appointmentDate).format("hh:mm A")}`}</Card.Title>
                                                <div className="d-flex justify-content-between">
                                                    {userType === "worker" || userType === "admin" && (<span>{`Client: ${element.client.firstName}`}</span>)}
                                                    {userType === "admin" && (<span>{`Worker: ${element.worker.firstName}`}</span>)}
                                                </div>
                                                <ul key={element.id}>
                                                    {(element.appointmentPortfolios).map((portfolio) => {
                                                        return (<li key={portfolio.id}>{`${portfolio.name} ---- ${portfolio.price}€`}
                                                        </li>)
                                                    })}
                                                </ul>
                                        </Card.Body>
                                    </Card>
                            )
                        })}
                        {userType === "admin" && (
                            <div className="d-flex">
                                <button disabled={currentPage == 1 ? "disabled" : ""} onClick={() => {
                                    console.log(currentPage)
                                    if (currentPage > 1) {
                                        setCurrentPage(currentPage - 1)
                                    }
                                }}>{"<-"}</button>
                                <button disabled={currentPage == totalPages ? "disabled" : ""} onClick={() => {
                                    
                                    if (currentPage < totalPages) {
                                        setCurrentPage(currentPage + 1)
                                    }
                                    console.log(currentPage)
                                }}>{"->"}</button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-3 bg-secondary p-0">

                </div>
            </div>
        </div>


    )

}