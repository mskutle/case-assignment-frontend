import { AddMeasurementsRequest, AddMeasurementsResponse } from "./types";

export const api = {
  addMeasurements: (
    request: AddMeasurementsRequest
  ): Promise<AddMeasurementsResponse> => {
    return fetch(`${process.env.NEXT_PUBLIC_API_HOST}/measurements`, {
      method: "post",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  },
};
