import { ROLE } from "@/common/config/enum.";

import { Radio, RadioChangeEvent } from "antd";

import { signIn, useSession } from "next-auth/react";

import { useEffect, useState } from "react";
import axios from "axios";
import { GoogleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

type DataTypes = {
    user: {
        name: string,
        email: string,
        image: string
    }
}

const Login = () => {
    const router = useRouter();
    const { data } = useSession();
    const [role, setRole] = useState(ROLE.USER);

    const [done, setDone] = useState(true)

    useEffect(() => {
        const role: any = localStorage.getItem("role");
        if (role) {
            setRole(role);
        }
    }, []);

    useEffect(() => {
        if (data && done) {
            const login = async () => {
                try {
                    const response = await axios.post("http://localhost:5000/auth", {
                        name: data?.user.name,
                        email: data?.user.email,
                        avatar: data?.user.image,
                        role: role
                    });
                    let userDataResponse = null
                    if (role === ROLE.USER) {
                        userDataResponse = await axios.get(`http://localhost:5000/user?email=${data?.user.email}`);
                    } else {
                        userDataResponse = await axios.get(`http://localhost:5000/owner?email=${data?.user.email}`);
                    }

                    toast.success("Đăng nhập thành công");
                    const userData = userDataResponse.data.data;

                    // Set token and user data in localStorage
                    localStorage.setItem("token", userData.token);
                    localStorage.setItem("data", JSON.stringify({
                        userData
                    }));
                    // Determine the redirection path based on the role
                    const redirectionPath = (role === ROLE.USER) ? "/user" : `/owner/${userData._id}`;
                    router.push(redirectionPath);
                } catch (error: any) {
                    if (error.response) {
                        if (error.response.data.message === "This email is a owner") {
                            toast.error("Email này là một chủ nhà");
                        } else if (error.response.data.message === "This  email is a user") {
                            toast.error("Email này là một người dùng");
                        } else {
                            toast.error("Đăng nhập thất bại. Vui lòng thử lại sau.");
                        }
                    } else {
                        toast.error("Đăng nhập thất bại. Vui lòng thử lại sau.");
                    }
                }
            };

            login();
            setDone(false);
        }
    }, [data])

    const handleGoogleSignIn = async () => {
        try {
            localStorage.setItem("role", role)
            await signIn("google", { callbackUrl: "/login" })
        } catch (error) {

        }
    }
    const onChange = (e: RadioChangeEvent) => {
        setRole(e.target.value);
    };
    return (
        <div className="flex flex-col items-center justify-center h-screen cursor-pointer">
            <div className="flex items-center mb-3">
                <p className="mr-4">Chọn quyền:</p>
                <Radio.Group onChange={onChange} value={role}>
                    <Radio value={ROLE.USER}>Người dùng</Radio>
                    <Radio value={ROLE.OWNER}>Chủ nhà</Radio>
                </Radio.Group>
            </div>

            <div onClick={handleGoogleSignIn} className="flex border-black border bg-white w-[250px] h-[50px]">
                <div className="h-full w-[20%] flex justify-center items-center">
                    <GoogleOutlined style={{ fontSize: '250%' }} />
                </div>

                <span className="flex items-center pl-8 border-l border-black">Login by Google</span>
            </div>
        </div>
    )
}

export default Login