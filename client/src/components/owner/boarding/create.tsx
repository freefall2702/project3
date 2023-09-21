import { Button, Input, InputNumber, Radio, Select, Upload } from "antd"
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import axios from "axios";
import { CITY, DISTRICT, TYPE_OF_BOARDING } from "@/common/config/enum.";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

async function uploadToS3(file: any) {

    // @ts-ignore

    const fileType = encodeURIComponent(file.type);

    const { data } = await axios.get(`/api/media?fileType=${fileType}`);

    const { uploadUrl, key } = data;

    await axios.put(uploadUrl, file);

    return key;

}

const BoardingCreateComponent = () => {
    const { handleSubmit, setValue, control, formState: { errors } } = useForm()

    const router = useRouter()

    const [data, setData] = useState({
        ownerId: "",
        name: "",
        image: "",
        type: "",
        district: "",
        city: "",
        address: "",
        description: "",
        price: 0,
    })

    const getS3Presigned = (value: string) => {
        return "https://storage-hw.s3.ap-southeast-1.amazonaws.com/" + value
    }
    const handleFileChange = async (e: any) => {
        e.preventDefault()
        const file = e.target.files[0];

        const res = await uploadToS3(file)
        setData({
            ...data, image: getS3Presigned(res)
        })
        console.log(res)

    };

    const onSubmit = async () => {
        try {
            const lS: any = await localStorage.getItem('data')
            const userData = JSON.parse(lS as string)
            setData({ ...data, ownerId: userData.userData._id })
            await axios.post('http://localhost:5000/boarding', data)
            toast.success("Tạo phòng trọ thành công")
            router.back()

        } catch (error) {
            toast.error("Tạo phòng trọ thất bại vui lòng thử lại sau")
        }

    }
    return (
        <div className="pt-[100px] h-screen w-auto">
            <div className="text-center my-8">
                <p className=" text-slate-700 text-2xl font-bold">Tạo nhà trọ</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col items-center">
                    <div className="flex w-full justify-center">
                        <Controller name="image" control={control} rules={{
                            required: "Phần bắt buộc"
                        }}
                            render={({ field: { onChange, value } }) => (
                                <div>
                                    <input type="file" accept=".jpg, .jpeg, .png, .pdf" onChange={handleFileChange} />
                                    {
                                        data?.image !== "" && <img src={data?.image} alt="image" className="w-[240px] h-[180px] mt-4" />
                                    }
                                </div>

                            )}
                        />
                        <div className="flex flex-col gap-y-5">
                            <Controller name="name" control={control} rules={{
                                required: "Phần bắt buộc"
                            }}
                                render={({ field: { onChange, value } }) => (
                                    <div className="flex">
                                        <span className="font-bold w-[150px] ">Tên:</span>
                                        <Input value={value} className="!w-[400px]" onChange={(e) => {
                                            onChange(e)
                                            setData({ ...data, name: e.target.value })
                                        }} />
                                    </div>
                                )}
                            />
                            <Controller name="type" control={control} rules={{
                                required: "Phần bắt buộc"
                            }}
                                render={({ field: { onChange, value } }) => (
                                    <div className="flex">
                                        <div className="font-bold w-[150px]">Loại</div>
                                        <Radio.Group onChange={(e) => {
                                            onChange(e)
                                            setData({ ...data, type: e.target.value })
                                        }} value={value}>
                                            <Radio value={'ROOMMATE'}>{TYPE_OF_BOARDING.ROOMMATE}</Radio>
                                            <Radio value={'ALONE'}>{TYPE_OF_BOARDING.ALONE}</Radio>
                                        </Radio.Group>
                                    </div>
                                )}
                            />
                            <Controller name="district" control={control} rules={{
                                required: "Phần bắt buộc"
                            }}
                                render={({ field: { onChange, value } }) => (
                                    <div className="flex">
                                        <div className="font-bold w-[150px]">Quận/Huyện</div>
                                        <Select defaultValue={data.district} onChange={(value) => {
                                            setValue('district', value)
                                            setData({ ...data, district: value })
                                        }} style={{ width: '400px' }} >
                                            {
                                                (Object.keys(DISTRICT) as Array<keyof typeof DISTRICT>).map((key) => (
                                                    <Select.Option value={DISTRICT[key]} key={key}>{DISTRICT[key]}</Select.Option>
                                                ))
                                            }
                                        </Select>
                                    </div>
                                )}
                            />
                            <Controller name="city" control={control} rules={{
                                required: "Phần bắt buộc"
                            }}
                                render={({ field: { onChange, value } }) => (
                                    <div className="flex">
                                        <div className="font-bold w-[150px]">Tỉnh</div>
                                        <Select defaultValue={data.city} onChange={(value) => {
                                            setValue('city', value)
                                            setData({ ...data, city: value })
                                        }} style={{ width: '400px' }}>
                                            {
                                                (Object.keys(CITY) as Array<keyof typeof CITY>).map((key) => (
                                                    <Select.Option value={CITY[key]} key={key}>{CITY[key]}</Select.Option>
                                                ))
                                            }
                                        </Select>
                                    </div>
                                )}
                            />
                            <Controller name="address" control={control} rules={{
                                required: "Phần bắt buộc"
                            }}
                                render={({ field: { onChange, value } }) => (
                                    <div className="flex">
                                        <span className="font-bold w-[150px] ">Địa chỉ:</span>
                                        <Input value={value} className="!w-[400px]" onChange={(e) => {
                                            onChange(e)
                                            setData({ ...data, address: e.target.value })
                                        }} />
                                    </div>
                                )}
                            />
                            <Controller name="price" control={control} rules={{
                                required: "Phần bắt buộc"
                            }}
                                render={({ field: { onChange, value } }) => (
                                    <div className="flex">
                                        <span className="font-bold w-[150px] ">Giá:</span>
                                        <InputNumber value={data.price} className="!w-[400px]" onChange={(value: any) => {
                                            setData({ ...data, price: value })
                                        }} />
                                    </div>
                                )}
                            />


                        </div>
                    </div>
                    <Controller name="description" control={control} rules={{
                        required: "Phần bắt buộc"
                    }}
                        render={({ field: { onChange, value } }) => (
                            <div className="flex mt-[20px] ml-[00px]">
                                <span className="font-bold w-[150px] ">Mô tả:</span>
                                <Input value={value} className="!w-[694px]" onChange={(e) => {
                                    onChange(e)
                                    setData({ ...data, description: e.target.value })
                                }} />
                            </div>
                        )}
                    />
                </div>
                <div className="flex justify-center mt-20">
                    <Button htmlType="submit" onClick={onSubmit}>Hoàn tất</Button>
                </div>
            </form>
        </div>
    )
}

export default BoardingCreateComponent