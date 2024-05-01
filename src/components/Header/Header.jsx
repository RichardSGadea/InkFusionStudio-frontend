import Container from 'react-bootstrap/Container';
import { useNavigate, Navigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from "react-redux";
import "./Header.css"
import { getUserData } from '../../app/Slices/userSlice';
import { logout } from '../../app/Slices/userSlice';


function Header() {

    const navigate = useNavigate();

    const myPassport = useSelector(getUserData)
    const token = myPassport?.token

    const dispatch = useDispatch()


    const userType = myPassport?.decoded.userRole;
    const admin = "admin"
    const client = "client"
    const worker = "worker"

    const logMeOut = () => {
        dispatch(logout())
    }

    return (
        <>
            {
                userType === admin || userType === client || userType === worker
                    ? (
                        <Navbar expand="lg" className="navbar bg-dark">
                            <Container className="navigationBar">
                                <Navbar.Brand href="/" className="navigationIcon text-white">Ink Fusion Studio</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="me-auto container">
                                        <div className='row navigationMenu'>
                                            <div className='col-6'>
                                                <div className=''>
                                                    <Nav.Link href="/home">Home</Nav.Link>
                                                    <Nav.Link href="/appointments">Appointments</Nav.Link>
                                                </div>
                                            </div>
                                            <div className='col-6'>
                                                <NavDropdown title={(myPassport.decoded.userEmail).split("@")[0]} id="basic-nav-dropdown navbar-left">
                                                    {userType === admin
                                                        ? (
                                                            <>
                                                                <NavDropdown.Item className="itemsDropDown" href="/contact">Contact</NavDropdown.Item>
                                                                <NavDropdown.Item className="itemsDropDown" href="/profile">Profile</NavDropdown.Item>
                                                                <NavDropdown.Item className="itemsDropDown" href="/users">Users</NavDropdown.Item>
                                                                <NavDropdown.Divider />
                                                            </>
                                                        ) : userType === worker ? (
                                                            <>
                                                                <NavDropdown.Item className="itemsDropDown" href="/contact">Contact</NavDropdown.Item>
                                                                <NavDropdown.Item className="itemsDropDown" href="/profile">Profile</NavDropdown.Item>
                                                                <NavDropdown.Divider />
                                                            </>
                                                        ) : (
                                                            <>
                                                                <NavDropdown.Item className="itemsDropDown" href="/contact">Contact</NavDropdown.Item>
                                                                <NavDropdown.Item className="itemsDropDown" href="/profile">Profile</NavDropdown.Item>
                                                                <NavDropdown.Divider />
                                                            </>
                                                        )
                                                    }

                                                    {
                                                        token ? (
                                                            <NavDropdown.Item onClick={() => {
                                                                logMeOut()
                                                                navigate("/")
                                                            }}
                                                            >
                                                                Logout
                                                            </NavDropdown.Item>
                                                        ) : (
                                                            <NavDropdown.Item className="itemsDropDown" onClick={() => navigate("/login")}>Login</NavDropdown.Item>
                                                        )
                                                    }
                                                </NavDropdown>
                                            </div>
                                        </div>
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    ) : (
                        <Navbar expand="lg" className="bg-dark">
                            <Container className="navigationBar">
                                <Navbar.Brand href="/" className="navigationIcon text-white">Ink Fusion Studio</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="me-auto container ">
                                        <div className='row navigationMenu'>
                                            <div className='col-6 navigationLinks'>
                                                <NavDropdown title="My account" id="basic-nav-dropdown" >
                                                    <NavDropdown.Item className="itemsDropDown" href="/contact">Contact</NavDropdown.Item>
                                                    <NavDropdown.Divider />
                                                    {
                                                        token ? (
                                                            <NavDropdown.Item onClick={() => {
                                                                logMeOut()
                                                                navigate("/")
                                                            }}
                                                            >
                                                                Logout
                                                            </NavDropdown.Item>
                                                        ) : (
                                                            <NavDropdown.Item className="itemsDropDown" onClick={() => navigate("/login")}>Login</NavDropdown.Item>
                                                        )
                                                    }
                                                </NavDropdown>
                                            </div>
                                        </div>
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    )
            }
        </>

    );
}

export default Header;