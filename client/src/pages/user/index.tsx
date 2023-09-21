import Header from "@/components/app-layout/header";
import Dashboard from "@/components/dashboard";
import Head from "next/head";

export default function Page() {
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

