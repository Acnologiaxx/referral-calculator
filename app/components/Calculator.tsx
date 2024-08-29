import React, { useState, useEffect, useCallback } from "react";
import Slider from "./Slider";
import BarGraph from "./BarGraph";
import axios from "axios";
import debounce from "lodash.debounce";

interface MonthlyData {
  name: string;
  income: number;
}

export default function IncomeCalculator() {
  const [referredCustomers, setReferredCustomers] = useState(1);
  const [newProjects, setNewProjects] = useState(10);
  const [existingProjects, setExistingProjects] = useState(300);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [loading, setLoading] = useState(false);
  const [incomeAfterOneYear, setIncomeAfterOneYear] = useState(0);

  const fetchMonthlyData = async (
    referredCustomers: number,
    newProjects: number,
    existingProjects: number
  ) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/calculate", {
        referredCustomers,
        newProjects,
        existingProjects,
      });
      setMonthlyData(response.data.monthlyData);
      setIncomeAfterOneYear(Math.floor(response.data.incomeAfterOneYear));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounce the fetchMonthlyData function to avoid excessive API calls
  const debouncedFetchMonthlyData = useCallback(
    debounce(
      (
        referredCustomers: number,
        newProjects: number,
        existingProjects: number
      ) => {
        fetchMonthlyData(referredCustomers, newProjects, existingProjects);
      },
      300
    ),
    []
  );

  useEffect(() => {
    debouncedFetchMonthlyData(referredCustomers, newProjects, existingProjects);
  }, [
    referredCustomers,
    newProjects,
    existingProjects,
    debouncedFetchMonthlyData,
  ]);

  return (
    <div className="font-sans p-4 font-system h-full min-h-[600px] flex flex-col sm:flex-row">
      <div className="w-[380px] p-8">
        <p className="text-justify font-inter-medium">
        Add in your expected referrals to see how much you could earn as a
        <span className="font-inter-extrabold"> Sunvoy Affiliate</span> in just 1 year
        </p>
        <div className="mt-4">
          <Slider
            min={1}
            max={10}
            value={referredCustomers}
            onChange={setReferredCustomers}
            trackStyle={{ backgroundColor: "#AFCC54" }}
            handleStyle={{ borderColor: "#AFCC54" }}
            label={<span className="font-system text-gray-400">Referred Customers per month</span>}
          />
          <div className="text-right font-inter-regular">
            {referredCustomers}
          </div>
        </div>
        <div className="mt-4">
          <Slider
            min={5}
            max={50}
            value={newProjects}
            onChange={setNewProjects}
            trackStyle={{ backgroundColor: "#AFCC54" }}
            handleStyle={{ borderColor: "#AFCC54" }}
            label={<span className="font-system text-gray-400">Avg. new projects per month</span>}
          />
          <div className="text-right font-inter-regular">{newProjects}</div>
        </div>
        <div className="mt-4">
          <Slider
            min={0}
            max={10000}
            value={existingProjects}
            onChange={setExistingProjects}
            trackStyle={{ backgroundColor: "#AFCC54" }}
            handleStyle={{ borderColor: "#AFCC54" }}
            label={<span className="font-system text-gray-400">Avg. existing projects</span>}
          />
          <div className="text-right font-inter-regular">
            {existingProjects}
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-inter-medium">
            Your <span className="font-inter-extrabold">monthly income</span>{" "}
            after 1 year: ${incomeAfterOneYear.toLocaleString()}
          </h2>
        </div>
      </div>
      <div className="w-full max-w-[850px] p-4">
        {monthlyData.length === 0 ? (
          <div className="w-[850px] h-full flex justify-center items-center">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : (
          <BarGraph data={monthlyData} />
        )}
      </div>
    </div>
  );
}
