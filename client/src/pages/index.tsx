import Header from "@/components/app-layout/header"
import Dashboard from "@/components/dashboard"
import Search from "antd/es/input/Search"
import Head from "next/head"
const Searching = () => {
    return (
        <>
        <Head>
                <title>Trang chủ</title>
            </Head>
            <Header />
            <Dashboard />
        </>
    )
}

export default Searching