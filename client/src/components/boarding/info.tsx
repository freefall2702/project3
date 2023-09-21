import { Divider, Input } from "antd";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TYPE_OF_BOARDING } from "@/common/config/enum."

const BoardingDetailComponent = () => {

    const { id } = useRouter().query

    const [data, setData] = useState<any>()

    const fetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/boarding/${id}`)
            setData(res.data.data)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {

        if (id) {
            fetchData()
        }

    }, [id])
    return (
        <div>
            <div className="pt-[100px] h-screen w-auto" >
                <div className="text-center my-8">
                    <p className=" text-slate-700 text-2xl font-bold">Thông tin phòng trọ</p>
                </div>
                <div className="flex justify-start w-[80%] mx-auto gap-x-4 ">
                    <img src={data?.image} alt="image" className="w-[600px] h-auto" />

                    <div className="flex flex-col gap-y-5">
                        <div className="flex items-center gap-x-4">
                            <span className="font-bold w-[150px] ">Tên:</span>
                            <Input value={data?.name} readOnly={true} className="!w-[300px]" />
                        </div>
                        <div className="flex items-center gap-x-4">
                            <span className="font-bold w-[150px] ">Loại:</span>
                            <Input value={TYPE_OF_BOARDING[data?.type]} readOnly={true} className="!w-[300px]" />
                        </div>
                        <div className="flex items-center gap-x-4">
                            <span className="font-bold w-[150px] ">Quận:</span>
                            <Input value={data?.district} readOnly={true} className="!w-[300px]" />
                        </div>
                        <div className="flex items-center gap-x-4">
                            <span className="font-bold w-[150px] ">Thành phố:</span>
                            <Input value={data?.city} readOnly={true} className="!w-[300px]" />
                        </div>
                        <div className="flex items-center gap-x-4">
                            <span className="font-bold w-[150px] ">Giá mỗi tháng:</span>
                            <Input value={data?.price} readOnly={true} className="!w-[300px]" />
                        </div>
                        <div className="flex items-center gap-x-4">
                            <span className="font-bold w-[150px] ">Mô tả:</span>
                            <p>{data?.description}</p>
                        </div>
                    </div>

                </div>
                <div className="text-center my-8">
                    <p className=" text-slate-700 text-2xl font-bold">Thông tin chủ phòng trọ</p>
                </div>
                <div className="flex gap-x-5 justify-center text-xl font-bold">
                    <p>Tên: {data?.owner.name}</p>
                    <p>Liên hệ</p>
                    <p>Số điện thoại: {data?.owner.phone ? data.owner.phone : 'N/A'}</p>
                    <p>Email: {data?.owner.email}</p>
                </div>
            </div>
        </div>
    )
}
export default BoardingDetailComponent;