import Header from "@/components/app-layout/header";
import BoardingDetailComponent from "@/components/boarding/info";
import Head from "next/head";

export default function Page() {
    return (
        <>
            <Head>
                <title>Nhà trọ</title>
            </Head>
            <Header />
            <BoardingDetailComponent />
        </>

    )
}

