import { useEffect, useState } from "react";
import { ClaimType } from "../../utilities/Types";
import Claim from "./components/Claim";
import { serverUrl } from "../../utilities/Constants";

export default function SubmittedClaims() {
  const [claims, setClaims] = useState<ClaimType[]>([]);

  useEffect(() => {
    async function fetchClaims() {
      try {
        const response = await fetch(`${serverUrl}/claims/pending`);
        const data = await response.json();
        setClaims(data);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }

    fetchClaims();
  }, []);

  return (
    <div className="p-6 flex flex-col items-center gap-2 w-full border  h-screen overflow-y-scroll ">
      <h1 className="font-semibold text-blue-800 text-xl">Submitted Claims</h1>

      {claims.map((claim) => (
        <Claim key={claim.id} claim={claim} />
      ))}
    </div>
  );
}
