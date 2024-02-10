import { useEffect, useState } from "react";
import PieChart from "./components/PieChart";
import { ClaimType, JobType } from "../../utilities/Types";
import { serverUrl } from "../../utilities/Constants";
import BarChart from "./components/BarChart";

export default function Dashboard() {
  const [claims, setClaims] = useState<ClaimType[]>([]);
  const [jobs, setJobs] = useState<JobType[]>([]);
  //   {
  //     labels: UserData.map((data) => data.year),
  //     datasets: [
  //       {
  //         label: "Users Gained",
  //         data: UserData.map((data) => data.userGain),
  //       },
  //     ],
  //   }

  const claimsStatusData = {
    labels: ["pending", "rejected", "accepted"],
    datasets: [
      {
        label: "Total Claims",
        data: [
          claims.filter((claim) => claim.status === "pending").length,
          claims.filter((claim) => claim.status === "rejected").length,
          claims.filter((claim) => claim.status === "accepted").length,
        ],
        backgroundColor: ["blue", "red", "rgb(22 163 74)"],
      },
    ],
  };

  const claimsPerJobData = {
    labels: jobs.map((job) => job.name),
    datasets: [
      {
        label: "Total Claims",
        data: jobs.map(
          (job) => claims.filter((claim) => claim.job_id == job.id).length
        ),
      },
    ],
  };

  useEffect(() => {
    async function getData() {
      try {
        const claimsRes = await fetch(`${serverUrl}/claims`);
        const claimsData = await claimsRes.json();
        setClaims(claimsData);

        const jobsRes = await fetch(`${serverUrl}/jobs`);
        const jobsData = await jobsRes.json();
        setJobs(jobsData);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }

    getData();
  }, []);

  console.log(
    jobs.map((job) => claims.filter((claim) => claim.job_id == job.id).length)
  );

  return (
    <div className="w-full overflow-y-scroll max-h-screen flex flex-col items-center gap-2 p-6">
      <h1 className="text-xl font-semibold  text-blue-800">Dashboard</h1>

      <div className=" flex flex-wrap   gap-2 justify-center w-full">
        <section className="grow p-2  border shadow-md rounded-lg flex flex-col items-center gap-2 justify-between">
          <h2 className="text-center text-lg font-medium">
            Total claims status
          </h2>

          <div>
            <PieChart chartData={claimsStatusData} />
          </div>
        </section>

        <section className="grow max-w-full md:max-w-[50%] p-2  border shadow-md rounded-lg flex flex-col items-center gap-2 justify-between">
          <h2 className="text-center text-lg font-medium">
            Number of claims per Job
          </h2>
          <div className="w-full h-full flex justify-center border">
            <BarChart chartData={claimsPerJobData} />
          </div>
        </section>
      </div>
    </div>
  );
}
