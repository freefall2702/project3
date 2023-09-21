import Header from "@/components/app-layout/header";
import BoardingCreateComponent from "@/components/owner/boarding/create";
import Head from "next/head";

export default function Page() {
    return (
        <>
            <Head>
                <title>Tạo nhà trọ</title>
            </Head>
            <Header />
            <BoardingCreateComponent />
        </>

    )
}

