import Header from "@/components/app-layout/header";
import UserDetailComponet from "@/components/user/detail";
import Head from "next/head";

export default function Page() {
    return (
        <div>
            <Head>
                <title>Thông tin</title>
            </Head>
            <Header />
            <UserDetailComponet />
        </div>

    )
}

