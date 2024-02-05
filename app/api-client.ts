import { AddMeasurementsRequest, AddMeasurementsResponse } from "./types";

export const api = {
  addMeasurements: (
    request: AddMeasurementsRequest
  ): Promise<AddMeasurementsResponse> => {
    return fetch("http://localhost:5107/measurements", {
      method: "post",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  },
};
