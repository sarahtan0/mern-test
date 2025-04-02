import { Form } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

//we don't need to include stuff like "type" or "placeholder" because they are regular html elements
interface TextInputFieldProps {
    //name is what it's called in the backend, not visible like label
    name: string,
    label: string,
    //<form.control {...register("title")}/>
    register: UseFormRegister<any>,
    //{...register("title", {required: "Required", etc})}
    registerOptions?: RegisterOptions,
    error?: FieldError,
    //this is for any other props
    [x: string]: any,
}

const TextInputField = ({name, label, register, registerOptions, error, ...props} : TextInputFieldProps) => {
    return (
        <Form.Group className="mb-3" id={`${name}-input`}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                {...props}
                {...register(name, registerOptions)}
                isInvalid={!!error}
            />
            <Form.Control.Feedback type="invalid">
                {error?.message}
            </Form.Control.Feedback>
        </Form.Group>
    );
}

export default TextInputField;