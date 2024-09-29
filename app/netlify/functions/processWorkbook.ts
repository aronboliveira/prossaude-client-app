import { Handler } from "@netlify/functions";
function processWorkbook(wb: any): any {
  console.log(wb);
  return wb;
}
const handler: Handler = async (
  event: any,
): Promise<{
  statusCode: number;
  body: string;
}> => {
  let wb;
  try {
    wb = JSON.parse(event.body as string);
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request: Expected JSON body" }),
    };
  }
  const processedWb = processWorkbook(wb);
  console.log("Workbook JSON correctly processed");
  return {
    statusCode: 200,
    body: JSON.stringify(processedWb),
  };
};
export { handler };
