import { NextResponse } from "next/server";

interface IResponse {
  message?: string;
  data?: any;
  status: ResponseInit["status"];
}

interface IResponseError {
  message?: string;
  data?: any;
  status: ResponseInit["status"];
}

const Response = ({ message = "Success", data, status = 200 }: IResponse) => {
  return NextResponse.json(
    {
      message,
      data,
    },
    {
      status,
    }
  );
};

const ResponseError = ({ message = "Success", data, status = 200 }: IResponseError) => {
  return NextResponse.json(
    {
      message,
      data,
    },
    {
      status,
    }
  );
};

export { Response, ResponseError };
