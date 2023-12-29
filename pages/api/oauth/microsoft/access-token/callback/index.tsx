import { NextApiRequest, NextApiResponse } from "next";

const MicrosoftAccessTokenCallbackPage = (req: NextApiRequest, res: NextApiResponse) => {
    console.log('req:' , req)

    res.status(200).json({ message: "Success", body:req.body });
};

export default MicrosoftAccessTokenCallbackPage;
