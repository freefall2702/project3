"use client"
import { CITY, COST, DISTRICT, FILTER, ROLE, TYPE_OF_BOARDING } from "@/common/config/enum."
import { Button, Checkbox, MenuProps, Radio, RadioChangeEvent, Select, Space } from "antd"
import { useEffect, useState } from "react"
import search from "../../../public/search.svg"
import Image from "next/image"
import axios from "axios"
import { useRouter } from "next/router"
import clsx from 'clsx'
import toast from "react-hot-toast"
const Dashboard = () => {
    const router = useRouter()

    const [items, setitems] = useState([])
    const [role, setRole] = useState(ROLE.GUEST)
    const [filter, setFilter] = useState({
        type: "",
        district: "",
        city: "Hà Nội",
        priceFrom: 0,
        priceTo: 99999999,
        orderByCreated: "asc",
        orderByUpdated: 'asc',
    })

    const getRole = async () => {
        const roleData = await localStorage.getItem('role');
        setRole(String(roleData));
    }

    useEffect(() => {
        getRole()
        console.log(role)
    }, [])

    const fetchData = async () => {
        await axios.get(`http://localhost:5000/boarding?type=${filter.type}&district=${filter.district}&city=${filter.city}&priceFrom=${filter.priceFrom}&priceTo=${filter.priceTo}&orderByCreated=${filter.orderByCreated}&orderByUpdated=${filter.orderByUpdated}`)
            .then((res) => { setitems(res.data.data) })
            .catch(error => console.log(error))
    }

    const onSearching = () => {
        fetchData()
    }

    const handleDropdownDistrict = (value: string) => {
        setFilter({ ...filter, district: value });
    }

    const handleDropdownCity = (value: string) => {
        setFilter({ ...filter, city: value });
    }

    const handleDropdownPrice = (value: string) => {
        if (value === COST.Level1) {
            setFilter({ ...filter, priceFrom: 0, priceTo: 2000000 });
        } else if (value === COST.Level2) {
            setFilter({ ...filter, priceFrom: 2000001, priceTo: 4000000 });

        } else if (value === COST.Level3) {
            setFilter({ ...filter, priceFrom: 4000001, priceTo: 6000000 });

        } else if (value === COST.Level4) {
            setFilter({ ...filter, priceFrom: 6000001, priceTo: 10000000 });
        }
        // else {
        //     setFilter({ ...filter, priceFrom: 10000001, priceTo: 20000000 })

        // }

    }

    const onChange = (e: RadioChangeEvent) => {
        setFilter({ ...filter, type: e.target.value });
    };

    return (
        <div>
            <div className={clsx("pt-[100px] flex flex-col items-center h-auto", {
                "!h-screen": items.length === 0
            })}>
                <div className="flex items-center justify-between mt-8 bg-white w-[70%] h-[100px] border border-black rounded">
                    <div className="ml-3">
                        <div className="font-bold">Loại</div>
                        <Radio.Group onChange={onChange} value={filter.type}>
                            <Radio value={'ROOMMATE'}>{TYPE_OF_BOARDING.ROOMMATE}</Radio>
                            <Radio value={'ALONE'}>{TYPE_OF_BOARDING.ALONE}</Radio>
                        </Radio.Group>
                    </div>
                    <div className="w-[15%] mx-[1px]">
                        <div className="font-bold">Quận/Huyện</div>
                        <Select defaultValue={DISTRICT.All} onChange={handleDropdownDistrict} style={{ width: '100%' }} >
                            {
                                (Object.keys(DISTRICT) as Array<keyof typeof DISTRICT>).map((key) => (
                                    <Select.Option value={DISTRICT[key]} key={key}>{DISTRICT[key]}</Select.Option>
                                ))
                            }
                        </Select>
                    </div>
                    <div className="w-[15%] mx-[1px]">
                        <div className="font-bold">Tỉnh</div>
                        <Select defaultValue={CITY.HANOI} onChange={handleDropdownCity} style={{ width: '100%' }}>
                            {
                                (Object.keys(CITY) as Array<keyof typeof CITY>).map((key) => (
                                    <Select.Option value={CITY[key]} key={key}>{CITY[key]}</Select.Option>
                                ))
                            }
                        </Select>
                    </div>
                    <div className="w-[15%] mx-[1px]">
                        <div className="font-bold">Giá</div>
                        <Select defaultValue={COST.All} style={{ width: '100%' }} onChange={handleDropdownPrice}>
                            {
                                (Object.keys(COST) as Array<keyof typeof COST>).map((key) => (
                                    <Select.Option value={COST[key]} key={key}>{COST[key]}</Select.Option>
                                ))
                            }
                        </Select>
                    </div>
                    <div>
                        <div className="font-bold">Sắp xếp</div>
                        <Checkbox onChange={(e) => { setFilter({ ...filter, orderByCreated: (e.target.checked ? 'asc' : 'desc'), orderByUpdated: '' }) }}>{FILTER.CREATED}</Checkbox>
                        <Checkbox onChange={(e) => { setFilter({ ...filter, orderByUpdated: (e.target.checked ? 'desc' : 'asc'), orderByCreated: '' }) }}>{FILTER.UPDATED}</Checkbox>
                    </div>

                    <Button className="ml-3 h-[98px] w-[98px] rounded-none text-center" onClick={onSearching}>
                        <Image src={search} alt="search-icon" style={{ width: 50, height: 50 }} className="mx-auto" />
                    </Button>
                </div>
                {items && items.map((item: any) => (
                    <div key={item._id} className="p-2 border border-1 border-black flex w-[70%] my-2 justify-between background cursor-pointer" onClick={() => {
                        if (role === ROLE.USER) {
                            router.push(`/boarding/${item._id}`)
                        } else {

                            toast.error("Bạn chưa đăng nhập")
                            router.push("/login")
                        }
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


                        <div className="flex flex-col ">
                            <p><span className="font-bold">Chủ nhà:</span> <br /> {item.owner.name}</p>
                            {/* <Button className="border-black">Xem thông tin chủ nhà</Button> */}
                        </div>
                        <div className="flex flex-col">
                            <p><span className="font-bold">Chi phí mỗi tháng:</span> <br /> {item.price} đồng</p>
                        </div>
                        <div className="flex items-center">
                            <Button className="w-full h-[50px] border-black" onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation()
                                if (role === ROLE.USER) {
                                    router.push(`/boarding/${item._id}`)
                                } else {

                                    toast.error("Bạn chưa đăng nhập")
                                    router.push("/login")
                                }
                            }}>
                                Xem chi tiết
                            </Button>
                        </div>
                    </div>

                ))}
            </div>
            <style jsx global>
                {`
                    .background {
                        background: linear-gradient(to right, #D8B5FF,#F0F0F0)
                    }
                `}
            </style>
        </div >

    )
}
export default Dashboard