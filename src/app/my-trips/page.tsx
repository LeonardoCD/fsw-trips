"use client";

import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import UserReservationItem from "./components/UserReservationItem";
import Link from "next/link";
import Button from "@/components/Button";

export default function MyTrips() {
  const [reservations, setReservations] = useState<
    Prisma.TripReservationsGetPayload<{
      include: {
        trip: true;
      };
    }>[]
  >([]);

  const { status, data } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" || !data?.user) return router.push("/");

    async function fetchReservations() {
      const response = await fetch(
        `http://localhost:3000/api/user/${(data?.user as any).id}/reservations`
      );
      const json = await response.json();

      setReservations(json);
    }

    fetchReservations();
  }, [status]);

  return (
    <div className="container mx-auto p-5">
      <h1 className="font-semibold text-primaryDarker text-xl">
        Minhas Viagens
      </h1>

      {reservations.length > 0 ? (
        reservations?.map((reservation) => (
          <UserReservationItem reservation={reservation} key={reservation.id} />
        ))
      ) : (
        <div className="flex flex-col">
          <p className="font-medium text-primaryDarker mt-5">
            Você ainda não tem nenhuma reserva =(
          </p>

          <Link href="/">
            <Button className="w-full mt-2">Fazer reserva</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
