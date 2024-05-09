import { useSelector } from "react-redux"
import { getUserData } from "../../app/Slices/userSlice"
import { useEffect, useState } from "react"
import { bringAllAppointments, bringAppointmentsUsers, bringAppointmentsWorkers, bringOneAppointment} from "../../services/apiCalls"
import dayjs from "dayjs"
import Card from 'react-bootstrap/Card';
import "./Appointments.css"
import { CustomButton } from "../../components/CustomButton/CustomButton"
import AppointmentModal from "../../components/AppointmentModal/AppointmentModal"

export const Appointments = () => {

    const [userAppointments, setUserAppointments] = useState([])
    const [oneUserAppointment, setOneUserAppointment] = useState({
        appointmentDate:""
    })

    const [totalPages, setTotalPages] = useState()
    const [currentPage, setCurrentPage] = useState(1)

    const userReduxData = useSelector(getUserData)
    const userType = userReduxData.decoded.userRole
    const token = userReduxData.token

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                if (userType === "client") {
                    const res = await bringAppointmentsUsers(userReduxData.token)
                    setUserAppointments(res)
                } else if (userType === "worker") {
                    const res = await bringAppointmentsWorkers(userReduxData.token)
                    setUserAppointments(res)
                } else {
                    const res = await bringAllAppointments(userReduxData.token, currentPage)
                    setUserAppointments(res.appointments)
                    setTotalPages(res.total_pages)
                }


            } catch (error) {
                console.log(error);
            }
        }
        fetchAppointments()
    }, [currentPage])

    const fetchOneAppointment = async (id) =>{
        try {
            const res = await bringOneAppointment(token,id);
            setOneUserAppointment(res)
        } catch (error) {
            console.log(error);
        }
    }

    const inputHandler = (e) => {
        setOneUserAppointment((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    useEffect(()=>{
        console.log(oneUserAppointment);
    },[oneUserAppointment])

    return (

        <div className="container-fluid appointmentsDesign bg-secondary">
            <div className="row">

                <div className="col-3 bg-secondary p-0 d-flex justify-content-center align-items-center ">
                    {userType === "client" &&
                        <AppointmentModal
                            titleProp={"NEW APPOINTMENT"}
                            classNameProp={"p-0 fs-3 bg-transparent"}
                            modalFormProp={"new"}
                        />
                    }
                </div>


                <div className="col-6 p-0">
                    <div className="d-flex flex-column justify-content-start align-items-start bg-secondary">
                        {userAppointments.map((element) => {
                            return (

                                <Card key={element.id} className="w-100 m-1" border="warning" style={{ width: '18rem' }}>
                                    <Card.Header>
                                        Appointment
                                        <CustomButton
                                            functionEmit={()=> fetchOneAppointment(element.id)}
                                            title={<AppointmentModal 
                                                titleProp={<img className="actionsIcon" src="../../../img/editIcon.png" />}
                                                classNameProp={"bg-transparent"}
                                                modalFormProp={"edit"}
                                                appointmentData={oneUserAppointment}
                                                inputHandlerProp={inputHandler}
                                            />}
                                            className={"actions"}
                                        />
                                        <CustomButton
                                            functionEmit={()=> fetchOneAppointment(element.id)}
                                            title={<AppointmentModal 
                                                titleProp={<img className="actionsIcon" src="../../../img/trashIcon.png" />}
                                                classNameProp={"bg-transparent"}
                                                appointmentData={oneUserAppointment}
                                                modalFormProp={"delete"}
                                            />}
                                            className={"actions"}
                                        />
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title>{`${dayjs(element.appointmentDate).format("DD/MM/YYYY")}  ---------  ${dayjs(element.appointmentDate).format("hh:mm A")}`}</Card.Title>
                                        <div className="d-flex justify-content-between">
                                            {userType === "worker" || userType === "admin" && (<span>{`Client: ${element.client.firstName}`}</span>)}
                                            {userType === "admin" && (<span>{`Worker: ${element.worker.firstName}`}</span>)}
                                        </div>
                                        <ul>
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