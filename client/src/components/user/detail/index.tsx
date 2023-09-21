import { useEffect, useState } from "react";
import Image from "next/image";
import { Button, DatePicker, Input, Select } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { CITY, DISTRICT } from "@/common/config/enum.";
import toast from "react-hot-toast";

const UserDetailComponet = () => {

    const { id } = useRouter().query

    const [data, setData] = useState<any>(null)
    const [readOnly, setReadOnly] = useState(true)

    const fetchData = async () => {
        try {
            const data = localStorage.getItem("data")
            const res = await axios.get(`http://localhost:5000/user/${id}`)
            setData(res.data.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchData()
    }, [])

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
            await axios.patch(`http://localhost:5000/user/${id}`, data)
            toast.success("Thay đổi thành công")
        } catch (error) {
            toast.error('Thay đổi thất bại. Vui lòng thư lại sau')
        }

    }

    return (
        <div>
            <div className="pt-[100px] h-screen w-auto">
                <div className="text-center my-8">
                    <p className=" text-slate-700 text-2xl font-bold">Thông tin người dùng</p>
                </div>
                <div className="flex mx-auto w-auto justify-center ">
                    <img src={data?.avatar} alt="avatar" className="!w-[300px] !h-[300px]" />
                    <div className="flex flex-col  ml-[50px] gap-y-7 mt-[40px]">
                        <div className="flex items-center gap-x-4 mb-4">
                            <span className="font-bold w-[150px] ">Tên:</span>
                            <Input value={data?.name} readOnly={true} className="!w-[300px]" />
                        </div>
                        <div className="flex items-center gap-x-4">
                            <span className="font-bold w-[150px]">Email:</span>
                            <Input value={data?.email} readOnly={true} className="!w-[300px]" />
                        </div>
                        <div className="flex items-center gap-x-4">
                            <span className="font-bold w-[150px]">Sinh ngày:</span>
                            <DatePicker defaultValue={dayjs(data?.birth)} format="YYYY-MM-DD" disabled={readOnly} onChange={handleDateChange} className="!w-[300px]" />
                        </div>
                        <div className="flex items-center gap-x-4">
                            <span className="font-bold w-[150px]">Đến từ:</span>
                            <Input value={data?.from} readOnly={readOnly} className="!w-[300px]" onChange={(e) => {
                                setData({ ...data, from: e.target.value })
                            }} />
                        </div>
                    </div>
                    <div className="flex flex-col ml-[50px] mt-[40px] gap-y-7">
                        <div className="flex items-center gap-x-4">
                            <span className="font-bold w-[150px] ">Huyện mong muốn:</span>
                            {
                                readOnly ? <Input value={data?.expected_district} readOnly={readOnly} className="!w-[300px]" /> :
                                    <Select defaultValue={DISTRICT.All} onChange={(value: string) => {
                                        setData({ ...data, expected_district: value });
                                    }} style={{ width: '300px' }} >
                                        {
                                            (Object.keys(DISTRICT) as Array<keyof typeof DISTRICT>).map((key) => (
                                                <Select.Option value={DISTRICT[key]} key={key}>{DISTRICT[key]}</Select.Option>
                                            ))
                                        }
                                    </Select>
                            }

                        </div>
                        <div className="flex items-center gap-x-4">
                            <span className="font-bold w-[150px]">Thành phố mong muốn:</span>
                            {
                                readOnly ?
                                    <Input value={data?.expected_city} readOnly={readOnly} className="!w-[300px]" onChange={(e) => {
                                        setData({ ...data, expected_city: e.target.value })
                                    }} /> :
                                    <Select defaultValue={CITY.All} onChange={(value: string) => {
                                        setData({ ...data, expected_cityt: value });
                                    }} style={{ width: '300px' }}>
                                        {
                                            (Object.keys(CITY) as Array<keyof typeof CITY>).map((key) => (
                                                <Select.Option value={CITY[key]} key={key}>{CITY[key]}</Select.Option>
                                            ))
                                        }
                                    </Select>
                            }
                        </div>
                        <div className="flex items-center gap-x-4">
                            <span className="font-bold w-[150px]">Giá mong muốn:</span>
                            <Input value={data?.expected_cost} readOnly={readOnly} className="!w-[300px]" onChange={(e) => {
                                setData({ ...data, expected_cost: e.target.value })
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
                                <Button className="mt-10 bg-white w-[120px] h-[30px] flex items-center justify-center" onClick={onEdit}>
                                    Sửa đổi
                                </Button>
                            </div>
                        </div>

                    )
                }

            </div>
        </div>
    )
}
export default UserDetailComponet;