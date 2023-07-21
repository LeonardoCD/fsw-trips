import { Prisma, TripReservations } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";
import ReactCountryFlag from "react-country-flag";
import ptBR from "date-fns/locale/pt-BR";
import Button from "@/components/Button";

interface UserReservationItemProps {
  reservation: Prisma.TripReservationsGetPayload<{
    include: {
      trip: true;
    };
  }>;
}

export default function UserReservationItem({
  reservation,
}: UserReservationItemProps) {
  const { trip } = reservation;

  return (
    <div>
      {/* CARD */}
      <div className="flex flex-col p-5 mt-5 border-grayLighter border border-solid shadow-lg rounded-lg">
        <div className="flex items-center gap-3 pb-5 border-b border-grayLighter border-solid">
          <div className="relative h-[106px] w-[124px]">
            <Image
              src={trip.coverImage}
              alt={trip.name}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-mg"
            />
          </div>

          <div className="flex flex-col">
            <h2 className="text-xl text-primaryDarker font-semibold">
              {trip.name}
            </h2>

            <div className="flex items-center gap-1">
              <ReactCountryFlag countryCode={trip.countryCode} svg />

              <p className="text-xs text-grayPrimary underline">
                {trip.location}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-5 text-primaryDarker">
          <h3 className="text-sm">Data</h3>

          <div className="flex items-center gap-1 mt-1">
            <p className="text-sm">
              {format(new Date(reservation.startDate), "dd 'de' MMM", {
                locale: ptBR,
              })}
            </p>
            {" - "}
            <p className="text-sm">
              {format(new Date(reservation.endDate), "dd 'de' MMM", {
                locale: ptBR,
              })}
            </p>
          </div>

          <h3 className="text-sm mt-5">Hóspedes</h3>

          <p className="text-sm pb-4 mt-1">{reservation.guests} hóspedes</p>

          <h3 className="font-semibold text-primaryDarker mt-3 pt-5 border-t border-solid border-grayLighter">
            Informações sobre o preço
          </h3>

          <div className="flex justify-between mt-2">
            <p className="text-primaryDarker text-sm">Total:</p>

            <p className="font-medium text-sm">
              R${Number(reservation.totalPaid)}
            </p>
          </div>

          <Button variant="danger" className="mt-5">Confirmar</Button>
        </div>
      </div>
    </div>
  );
}
