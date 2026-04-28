import { Formik, Form, type FormikValues } from "formik";
import { registerValidationSchema } from "../validations";
import { InputField } from "../components/common/InputField";
import { Button } from "../components/common/Button";
import { usePostAxios } from "../api/hooks/usePostAxios";
import { ROUTES } from "../constant/routesPath";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Registration = () => {
    const navigate = useNavigate();
    const [userRegister, { isLoading }] = usePostAxios();

    const handleSubmit = async (values: FormikValues) => {
        if (values.email.includes('admin')) {
            values.role = 'admin'
        } else {
            values.role = 'user'
        }
        const newUser = await userRegister('/auth/register', values);

        if (newUser.status !== 200) toast.warning(newUser.message);
        if (newUser.status === 200) {
            toast.success("User Registered SuccessFully");
            navigate(ROUTES.LOGIN.path);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold text-center text-primary mb-6">
                    Registration
                </h2>

                <Formik
                    enableReinitialize
                    initialValues={{
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                        role: ""
                    }
                    }
                    validationSchema={registerValidationSchema}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    {({ values }) => (
                        <Form className="space-y-4">
                            <InputField name='name' label='Name' value={values.name} placeholder='Enter your name' isCompulsory />
                            <InputField name='email' label='Email' value={values.email} placeholder='Enter your email' isCompulsory />
                            <InputField type="password" name='password' label='Password' value={values.password} placeholder='Enter your password' isCompulsory />
                            <InputField type="password" name='confirmPassword' label='Confirm Password' value={values.confirmPassword} placeholder='confirm your password' isCompulsory />
                            <span>Already have an account? <Link to={'/login'} className="underline text-blue-600">login</Link></span>

                            <Button
                                variant="black"
                                className="w-fit"
                                type="submit"
                                disabled={isLoading}
                            >
                                Register
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default Registration;