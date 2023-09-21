import { Button } from "antd"
import logout from "../../../public/logout.svg"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { ROLE } from "@/common/config/enum."
import toast from "react-hot-toast"

const Header = () => {
    const router = useRouter()
    const { status } = useSession()
    const [data, setData] = useState<any>(null)
    const [role, setRole] = useState<any>(null)
    const [id, setId] = useState<any>(null)

    const getData = async () => {
        try {
            const localStorageData: any = await window.localStorage.getItem("data"); return localStorageData;
        } catch (error) {
            console.error("Error retrieving data from localStorage:", error);
            return null;
        }
    }
    const getRole = async () => {
        try {
            const localStorageData = await window.localStorage.getItem("role");
            return localStorageData;
        } catch (error) {
            console.error("Error retrieving data from localStorage:", error);
            return null;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await getData();
            const roleResult = await getRole();
            setData(result ? JSON.parse(result) : "");
            setRole(roleResult);
        };
        if (status === "authenticated" || data === null) {
            fetchData();
        }
    }, []);

    return (
        <header className="flex bg-slate-500 h-[100px] items-center justify-between px-[100px] absolute w-screen">

            <div className="flex items-center justify-center">
                <span className="text-white text-2xl cursor-pointer" onClick={() => {
                    role === ROLE.USER ? router.push('/') : role === ROLE.OWNER ? router.push(`/owner/${data.userData._id}`) : router.push('/')

                }}>TimNhaTro</span>
            </div>
            {status === "authenticated" ? (
                <div className="flex gap-x-4 items-center">

                    {role === ROLE.OWNER && <Button className="text-white" onClick={() => {
                        router.push("/owner/boarding-create")
                    }}>Tạo nhà trọ</Button>}
                    {role === ROLE.USER && <Button className="text-white" onClick={() => {
                        router.push('/user')
                    }}>Tìm kiếm</Button>}
                    <div className="flex items-center cursor-pointer mx-1" onClick={() => {
                        role === ROLE.OWNER ? router.push(`/owner/${data.userData._id}`) : router.push(`/user/${data.userData._id}`)
                    }}>

                        <p className="text-white">{data?.userData?.name || "N/A"}</p>
                        {data?.userData?.avatar && <Image src={data?.userData?.avatar} alt="avatar" width={50} height={50} className=" rounded-full" />}
                    </div>

                    <Button className=" bg-rose-500 w-[50px] h-[50px] flex items-center justify-center" onClick={() => {
                        signOut({ callbackUrl: "/" });
                        localStorage.clear()
                        toast.success("Đăng suất thành công")
                    }}><Image src={logout} alt="logout" className="w-6 h-6 border-none" /></Button>
                </div>
            ) : (<Button className="text-white" onClick={() => { router.push("/login") }}>Đăng nhập</Button>)
            }



        </header >
    )
}
export default Header