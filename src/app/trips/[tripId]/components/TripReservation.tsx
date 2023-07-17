"use client";

import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { Trip } from "@prisma/client";
import React from "react";
import { Controller, useForm } from "react-hook-form";

interface TripReservationProps {
  tripStartDate: Date;
  tripEndDate: Date;
  tripMaxGuests: number;
}

interface TripReservationForm {
  guests: number;
  startDate: Date | null;
  endDate: Date | null;
}

export default function TripReservation({
  tripMaxGuests,
  tripEndDate,
  tripStartDate,
}: TripReservationProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<TripReservationForm>();

  const onSubmit = (data: TripReservationForm) => {
    console.log({ data });
  };

  const startDate = watch("startDate");

  return (
    <div className="flex flex-col px-5">
      <div className="flex gap-4">
        <Controller
          name="startDate"
          rules={{
            required: {
              value: true,
              message: "Data inicial é obrigatória.",
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              placeholderText="Data de Início"
              onChange={field.onChange}
              selected={field.value}
              className="w-full"
              error={!!errors.startDate}
              errorMessage={errors.startDate?.message}
              minDate={tripStartDate}
            />
          )}
        />

        <Controller
          name="endDate"
          rules={{
            required: {
              value: true,
              message: "Data final é obrigatória.",
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              placeholderText="Data Final"
              onChange={field.onChange}
              selected={field.value}
              className="w-full"
              error={!!errors.endDate}
              errorMessage={errors.endDate?.message}
              maxDate={tripEndDate}
              minDate={startDate ?? tripStartDate}
            />
          )}
        />
      </div>

      <Input
        placeholder={`Número de hóspedes (max: ${tripMaxGuests})`}
        className="mt-4"
        {...register("guests", {
          required: {
            value: true,
            message: "Número de hóspedes é obrigatório",
          },
        })}
        errorMessage={errors.guests?.message}
        error={!!errors.guests}
      />

      <div className="flex justify-between mt-3">
        <p className="font-medium text-sm text-primaryDarker">Total</p>

        <p className="font-medium text-sm text-primaryDarker">R$2500</p>
      </div>

      <div className="pb-10 border-b border-grayLighter">
        <Button
          onClick={() => handleSubmit(onSubmit)()}
          className="mt-3 w-full"
        >
          Reservar agora
        </Button>
      </div>
    </div>
  );
}
