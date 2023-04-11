// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const GetSimJson = async (req: NextApiRequest, res: NextApiResponse) => {
  const { reportId } = req.body;
  try {
    const report = await fetch(
      `http://localhost:8084/json-reports/${reportId}`,
      {
        method: "POST",
      }
    );
    return res.send(report);
  } catch (err) {
    console.error(err);
    return res.status(400).send("error");
  }
};

export default GetSimJson;
