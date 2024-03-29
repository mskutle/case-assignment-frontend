"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AddMeasurementsRequest } from "./types";
import { api } from "./api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl } from "./FormControl";
import { Input } from "./Input";
import { NewsScore } from "./NewsScore";

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; error: Error }
  | { status: "success"; score: number };

export function MeasurementsForm() {
  const [state, setState] = useState<State>({ status: "idle" });

  const { handleSubmit, register, formState, reset } =
    useForm<MeasurementFormData>({
      mode: "onSubmit",
      resolver: zodResolver(validationSchema),
    });

  const onSubmit = (formData: MeasurementFormData) => {
    if (state.status === "loading") {
      // request in-flight, ignore submissions
      return;
    }

    const request: AddMeasurementsRequest = {
      measurements: [
        { type: "TEMP", value: formData.temperature },
        { type: "HR", value: formData.heartrate },
        { type: "RR", value: formData.respiratoryRate },
      ],
    };

    setState({ status: "loading" });
    api
      .addMeasurements(request)
      .then((response) =>
        setState({ status: "success", score: response.score }),
      )
      .catch((err) => {
        // log to Sentry or similar
        setState({ status: "error", error: err });
      });
  };

  const handleResetClick = () => {
    setState({ status: "idle" });
    reset();
  };

  return (
    <form
      className="flex w-[404px] flex-col gap-10"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <h1 className="text-xl font-semibold">NEWS score calculator</h1>
      {state.status === "error" ? (
        <div className="rounded-md border border-red-100 bg-red-50 p-4 text-sm text-red-600">
          Oops! An unexpected error occurred.
        </div>
      ) : null}
      <FormControl>
        <FormControl.Label htmlFor="temperature">
          Body temperature
        </FormControl.Label>
        <FormControl.Description>Degrees celsius</FormControl.Description>
        <FormControl.Control>
          <Input {...register("temperature")} id="temperature" type="number" />
        </FormControl.Control>
        <FormControl.Error message={formState.errors.temperature?.message} />
      </FormControl>
      <FormControl>
        <FormControl.Label htmlFor="heartrate">Heart rate</FormControl.Label>
        <FormControl.Description>Beats per minute</FormControl.Description>
        <Input {...register("heartrate")} id="heartrate" type="number" />
        <FormControl.Error message={formState.errors.heartrate?.message} />
      </FormControl>
      <FormControl>
        <FormControl.Label htmlFor="rr">Respiratory rate</FormControl.Label>
        <FormControl.Description>Breaths per minute</FormControl.Description>
        <Input {...register("respiratoryRate")} id="rr" type="number" />
        <FormControl.Error
          message={formState.errors.respiratoryRate?.message}
        />
      </FormControl>
      <div className="flex items-center gap-6">
        <button className="flex min-w-52 items-center justify-center rounded-full bg-[#7424DA] px-4 py-2 text-white hover:opacity-90">
          {state.status === "loading"
            ? "Calculating..."
            : "Calculate NEWS score"}
        </button>
        <button
          type="button"
          className="flex items-center rounded-full bg-[#FAF6FF] px-4 py-2 hover:opacity-90"
          onClick={handleResetClick}
        >
          Reset form
        </button>
      </div>
      {state.status === "success" ? <NewsScore score={state.score} /> : null}
    </form>
  );
}

const validationSchema = z.object({
  temperature: z.coerce.number().int().min(32).max(42),
  heartrate: z.coerce.number().int().min(26).max(220),
  respiratoryRate: z.coerce.number().int().min(4).max(60),
});

type MeasurementFormData = z.infer<typeof validationSchema>;
