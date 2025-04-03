import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { LogInCredentials } from "../network/notes_api";
import { Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./forms/TextInputField";
import * as NotesApi from "../network/notes_api";
import styleUtils from "../styles/utils.module.css";

interface LoginModalProps {
    onDismiss: () => void,
    onLoginSuccessful: (user: User) => void,
}


const LogInModal = ({onDismiss, onLoginSuccessful} : LoginModalProps) => {
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<LogInCredentials>();

    async function onSubmit (credentials: LogInCredentials) {
        try{
            const user = await NotesApi.login(credentials);
            onLoginSuccessful(user);
        } catch(error) {
            alert(error);
            console.error(error);
        }
    }
    return(
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Log In
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit ={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="username"
                        type="text"
                        label="Username"
                        placeholder="Username"
                        register = {register}
                        registerOptions={{required: "Required"}}
                        error = {errors.username}
                    />
                    <TextInputField
                        name="password"
                        type="password"
                        label="Password"
                        placeholder="Password"
                        register={register}
                        registerOptions={{required: "Required"}}
                        error={errors.password}
                    />
                    <Button 
                        className={styleUtils.width100}
                        type="submit"
                        disabled={isSubmitting}>
                        Log In
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default LogInModal;