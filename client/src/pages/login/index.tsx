import Header from "@/components/app-layout/header";
import Login from "@/components/login";
import Head from "next/head";

export default function Page() {
    return (
        <>
            <Head>
                <title>Đăng nhập</title>
            </Head>
            <Header />
            <Login />
        </>

    )
}

