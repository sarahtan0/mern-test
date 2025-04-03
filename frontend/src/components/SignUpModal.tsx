import { Button, Form, Modal } from "react-bootstrap";
import { User } from "../models/user";
import TextInputField from "./forms/TextInputField";
import { useForm } from "react-hook-form";
import { SignUpCredentials } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import styleUtils from "../styles/utils.module.css"

interface SignUpModalProps {
    onDismiss: () => void,
    onSignUpSuccessful: (user: User) => void,
}

const SignUpModal = ({onDismiss, onSignUpSuccessful}: SignUpModalProps) => {

    const {register, handleSubmit, formState : {errors, isSubmitting}} = useForm<SignUpCredentials>();

    async function onSubmit(credentials: SignUpCredentials){
        try{
            // const credentials: SignUpCredentials = {
            //     username: "user3",
            //     password: "password",
            //     email: "test@email.com",
            //   };
            // console.log(credentials);
            const newUser = await NotesApi.signUp(credentials);
            //will take the new user and save to db when successful (?)
            onSignUpSuccessful(newUser);
        }catch(error){
            alert(error);
            console.error(error);
        }
    }

    //onSubmit={handleSubmit(onSubmit)}
        //the first onSubmit is what triggers when form is submitted
        //handleSubmit makes sure required and stuff is passed
        //onSubmit inside handleSubmit is what's run after handleSubmit is satisfied
    return(
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
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
                        name="email"
                        type="text"
                        label="Email"
                        placeholder="Email"
                        register={register}
                        registerOptions={{required: "Required"}}
                        error={errors.email}
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
                        Sign Up
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default SignUpModal;