import { Formik, Form, type FormikValues } from "formik";
import { useDispatch } from "react-redux";
import { loginSchema } from "../validations";
import { setLoggedInUser } from "../redux/reducers/auth.slice";
import { InputField } from "../components/common/InputField";
import { Button } from "../components/common/Button";
import { usePostAxios } from "../api/hooks/usePostAxios";
import { ROUTES } from "../constant/routesPath";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userLogin, { isLoading }] = usePostAxios();

    const handleSubmit = async (values: FormikValues) => {
        const loggedInUser = await userLogin('/auth/login', values);
        if (!loggedInUser.success) toast.warning(loggedInUser.message);
        if (loggedInUser.success) {
            toast.success("User LoggedIn SuccessFully");
            dispatch(setLoggedInUser(loggedInUser));
            navigate(ROUTES.DASHBOARD.path);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold text-center text-primary mb-6">
                    Login
                </h2>

                <Formik
                    enableReinitialize
                    initialValues={{ email: "", password: "" }}
                    validationSchema={loginSchema}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    {({ values }) => (
                        <Form className="space-y-4">

                            <InputField name='email' label='Email' value={values.email} placeholder='Enter your email' isCompulsory />
                            <InputField type="password" name='password' label='Password' value={values.password} placeholder='Enter your password' isCompulsory />
                            <span>Don't have an account? <Link to={'/register'} className="underline text-blue-600">register</Link></span>
                            <Button
                                variant="black"
                                className="w-fit"
                                type="submit"
                                disabled={isLoading}
                            >
                                Login
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default Login;