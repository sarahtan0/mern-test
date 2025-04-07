import { Container, Nav, Navbar, NavbarToggle } from "react-bootstrap";
import { User } from "../models/user";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";

interface NavBarProps{
    loggedInUser: User | null,
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    onLogoutClicked: () => void,
}

const NavBar = ({loggedInUser, onSignUpClicked, onLoginClicked, onLogoutClicked} : NavBarProps) => {
    return(
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand>
                    Notes
                </Navbar.Brand>
                <NavbarToggle aria-controls="main-navbar"/>
                <Navbar.Collapse id="main-navbar">
                    <Nav className="ms-auto">
                        {loggedInUser
                        ? <NavBarLoggedInView
                            user = {loggedInUser}
                            onLogOutSuccessful={() => onLogoutClicked}/>
                        : <NavBarLoggedOutView
                            onLoginSuccessful={() => {onLoginClicked()}}
                            onSignUpSuccessful={() => {onSignUpClicked()}}/>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;