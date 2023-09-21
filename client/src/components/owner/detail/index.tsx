import { useEffect, useState } from "react";
import Image from "next/image";
import { Button, DatePicker, Input } from "antd";
import { useRouter } from "next/router";
import axios from "axios";
import dayjs from "dayjs";
import { TYPE_OF_BOARDING } from "@/common/config/enum.";
import toast from "react-hot-toast";

const OwnerDetailComponet = () => {
    const { id } = useRouter().query
    const router = useRouter()
    const [data, setData] = useState<any>(null)
    const [boardingData, setBoardData] = useState<any>(null)
    const [readOnly, setReadOnly] = useState(true)

    const fetchData = async () => {
        try {
            const data = localStorage.getItem("data")
            const res = await axios.get(`http://localhost:5000/owner/${id}`)
            const boardings = await axios.get(`http://localhost:5000/boarding?ownerId=${id}`)
            setData(res.data.data)
            setBoardData(boardings.data.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        if (id) {
            fetchData()
        }
    }, [id]);

    const handleDateChange = (date: dayjs.Dayjs | null) => {
        setData({
            ...data,
            birth: date?.format("YYYY-MM-DD")
        })
    };

    const onEdit = async () => {
        try {
            await axios.patch(`http://localhost:5000/owner/${id}`, data)
            toast.success("Thay đổi thành công")
        } catch (error) {
            toast.error('Thay đổi thất bại. Vui lòng thư lại sau')
        }
    }

    return (
        <div>
            <div className="pt-[100px] h-screen w-auto">
                <div className="text-center my-8">
                    <p className=" text-slate-700 text-2xl font-bold">Thông tin chủ nhà</p>
                </div>
                <div className="flex mx-auto w-[60%]">
                    <img src={data?.avatar} alt="avatar" className="!w-[300px] !h-[300px]" />
                    <div className="flex flex-col ml-[50px] gap-y-7 my-auto">
                        <div className="flex items-center gap-x-4">
                            <span className="font-bold w-[150px] ">Tên:</span>
                            <Input value={data?.name} readOnly={readOnly} className="!w-[300px]" />
                        </div>
                        <div className="flex items-center gap-x-4">
                            <span className="font-bold w-[150px]">Email:</span>
                            <Input value={data?.email} readOnly={readOnly} className="!w-[300px]" />
                        </div>
                        <div className="flex items-center gap-x-4">
                            <span className="font-bold w-[150px]">Số điện thoại:</span>
                            <Input value={data?.phone} readOnly={readOnly} className="!w-[300px]" onChange={(e) => {
                                setData({ ...data, phone: e.target.value })
                            }} />
                        </div>
                        <div className="flex items-center gap-x-4">
                            <span className="font-bold w-[150px]">Sinh ngày:</span>
                            <DatePicker defaultValue={dayjs(data?.birth)} format="YYYY-MM-DD" disabled={readOnly} onChange={handleDateChange} className="!w-[300px]" />
                        </div>
                        <div className="flex items-center gap-x-4">
                            <span className="font-bold w-[150px]">Nơi sinh:</span>
                            <Input value={data?.from} readOnly={readOnly} className="!w-[300px]" onChange={(e) => {
                                setData({ ...data, from: e.target.value })
                            }} />
                        </div>
                    </div>

                </div>

                {
                    readOnly ? (
                        <div className=" flex justify-center">
                            <Button className="mt-10 bg-white w-[120px] h-[30px] flex items-center justify-center" onClick={() => {
                                setReadOnly(false)
                            }}>
                                Sửa đổi
                            </Button>
                        </div>
                    ) : (
                        <div className="flex gap-x-[50px] justify-center"><div className=" flex justify-center">
                            <Button className="mt-10 bg-white w-[120px] h-[30px] flex items-center justify-center" onClick={() => {
                                fetchData()
                                setReadOnly(true)
                            }}>
                                Huỷ
                            </Button>
                        </div>
                            <div className=" flex justify-center">
                                <Button className="mt-10 bg-white w-[120px] h-[30px] flex items-center justify-center bg-slate-400" onClick={onEdit}>
                                    Sửa đổi
                                </Button>
                            </div>
                        </div>

                    )
                }
                <div className="text-center my-10">
                    <p className=" text-slate-700 text-2xl font-bold">Danh sách nhà trọ</p>
                </div>
                <div className="flex flex-col items-center">
                    {
                        boardingData && boardingData.map((item: any) => (
                            <div key={item._id} className="p-2 border border-1 border-black flex w-[70%] my-2 justify-between background cursor-pointer" onClick={() => {
                                router.push(`/boarding/${item._id}`)
                            }}>
                                <div className="flex">
                                    <img src={item.image} className="w-[150px] h-[150px] mr-5" />
                                    <div className="flex flex-col gap-y-2 mr-5">
                                        <p className=" text-xl"> <span className="font-bold">Tên:</span> {item.name}</p>
                                        <p className=" text-xl"><span className="font-bold">Loại:</span> {TYPE_OF_BOARDING[item.type]}</p>
                                        <p className=" text-xl"><span className="font-bold">Huyện:</span> {item.district}</p>
                                        <p className=" text-xl"><span className="font-bold">Thành phố:</span> {item.city}</p>
                                        <p className=""></p>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p><span className="font-bold">Chi phí mỗi tháng:</span> <br /> {item.price} đồng</p>
                                </div>
                                <div className="flex items-center">
                                    <Button className="w-full h-[50px] border-black" onClick={() => {
                                        router.push(`/boarding/${item._id}`)
                                    }}>
                                        Xem chi tiết
                                    </Button>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>
            <style jsx global>
                {`
                    .background {
                        background: linear-gradient(to right, #D8B5FF,#F0F0F0)
                    }
                `}
            </style>
        </div>
    )
}
export default OwnerDetailComponet;