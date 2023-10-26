import { NextApiRequest, NextApiResponse } from "next";

const MicrosoftCallbackPage = (req: NextApiRequest, res: NextApiResponse) => {
    //const { query } = req;
    //const code = query.code as string;

    // Utilisez le code pour effectuer les opérations nécessaires
    //console.log("Code:", code);


    //res.redirect(process.env.BASE_URL+'/callback/microsoft/access-token/request?code=' + code)

    res.redirect(process.env.BASE_URL+'/profile')

    //res.status(200).json({ message: "Success" });
};

export default MicrosoftCallbackPage;
