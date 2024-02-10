import { useEffect, useState } from "react";
import { ClaimType } from "../../utilities/Types";
import ReviewedClaim from "./components/ReviewedClaim";

export default function ReviewedClaims() {
  const [claims, setClaims] = useState<ClaimType[]>([]);
  const [isAccepted, setIsAccepted] = useState(true);

  useEffect(() => {
    async function fetchClaims() {
      try {
        const response = await fetch("http://localhost:8000/claims/reviewed");
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
    <div className="w-full flex flex-col gap-2 items-center p-6">
      <h1 className="text-xl text-blue-800 font-semibold">Reviewed Claims</h1>

      <div className="border shadow rounded flex overflow-hidden w-[400px]">
        <button
          className={`w-1/2 p-1 shadow  font-semibold text-white bg-green-500 ${
            isAccepted && "opacity-40"
          }`}
          onClick={() => setIsAccepted(true)}
        >
          Accepted
        </button>
        <button
          className={`w-1/2 p-1 shadow font-semibold text-white bg-red-500 ${
            !isAccepted && "opacity-40"
          }`}
          onClick={() => setIsAccepted(false)}
        >
          Rejected
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {claims.map((claim) =>
          isAccepted
            ? claim.status === "accepted" && (
                <ReviewedClaim key={claim.id} claim={claim} />
              )
            : claim.status === "rejected" && (
                <ReviewedClaim key={claim.id} claim={claim} />
              )
        )}
      </div>
    </div>
  );
}
