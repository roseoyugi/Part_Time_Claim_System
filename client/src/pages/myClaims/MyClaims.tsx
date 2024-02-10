import React, { useContext, useEffect, useState } from "react";
import { ClaimType } from "../../utilities/Types";
import { UserContext } from "../../App";
import MyClaim from "./components/MyClaim";

export default function MyClaims() {
  const [claims, setClaims] = useState<ClaimType[]>([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function fetchClaims() {
      try {
        const response = await fetch(
          `http://localhost:8000/claims/${user?.id}`
        );
        const data = await response.json();
        setClaims(data);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }

    fetchClaims();
  }, [user?.id]);

  return (
    <div className="flex flex-col items-center w-full p-6 gap-2">
      <h1 className="text-lg font-semibold text-blue-800">My Claims</h1>
      <div className="flex flex-col gap-2">
        {claims.map((claim) => (
          <MyClaim key={claim.id} claim={claim} />
        ))}
      </div>
    </div>
  );
}
