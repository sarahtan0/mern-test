import { Button} from "react-bootstrap";

interface NavBarLoggedOutViewProps {
    onLoginSuccessful: () => void,
    onSignUpSuccessful: () => void,
}

const NavBarLoggedOutView = ({onLoginSuccessful, onSignUpSuccessful} : NavBarLoggedOutViewProps) => {
    return(
        <>
            <Button
                className={`mb-4 mt-4`}
                onClick={onSignUpSuccessful}>
                Sign Up
            </Button>
            <Button
                className={`mb-4 mt-4`}
                onClick={onLoginSuccessful}>
                Login
            </Button>
        </>
    );
}

export default NavBarLoggedOutView;