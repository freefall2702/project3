import Header from "@/components/app-layout/header";
import OwnerDetailComponet from "@/components/owner/detail";
import Head from "next/head";

export default function Page() {
    return (
        <>
            <Head>
                <title>Thông tin</title>
            </Head>
            <Header />
            <OwnerDetailComponet />
        </>

    )
}

