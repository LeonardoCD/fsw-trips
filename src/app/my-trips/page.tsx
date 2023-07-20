"use client";

import { TripReservations } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function MyTrips() {
  const [reservations, setReservations] = useState<TripReservations[]>([]);

  const { status, data } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" || data?.user) return router.push("/");

    async function fetchReservations() {
      const response = await fetch(
        `http://localhost:3000/api/user/${(data?.user as any).id}/reservations`
      );
      const json = await response.json();

      setReservations(json);
    }

    fetchReservations();
  }, [status]);

  return <div>MyTrips</div>;
}
