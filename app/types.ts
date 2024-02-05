export type Measurement = {
  type: "TEMP" | "HR" | "RR";
  value: number;
};

export type AddMeasurementsRequest = {
  measurements: Measurement[];
};

export type AddMeasurementsResponse = {
  score: number;
};
