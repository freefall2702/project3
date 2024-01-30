import { S3 } from "aws-sdk";
import { randomUUID } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

const s3 = new S3({
    apiVersion: "2012-10-17",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    signatureVersion: 'v4'
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(1)
    const ex = (req.query.fileType as string).split("/")[1];

    const Key = `${randomUUID()}.${ex}`;

    const s3Params = {
        Bucket: 'user123123',
        Key,
        Expires: 60,
        ContentType: `image/${ex}`,
    };


    const uploadUrl = await s3.getSignedUrlPromise("putObject", s3Params);

    console.log("uploadUrl", uploadUrl);

    res.status(200).json({
        uploadUrl,
        key: Key,
    });
}