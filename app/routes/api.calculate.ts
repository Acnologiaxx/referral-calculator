import { json } from "@remix-run/node";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";

// Loader function to handle GET requests
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const referredCustomers = Number(url.searchParams.get("referredCustomers"));
  const newProjects = Number(url.searchParams.get("newProjects"));
  const existingProjects = Number(url.searchParams.get("existingProjects"));

  return calculateResponse(referredCustomers, newProjects, existingProjects);
};

// Action function to handle POST requests
export const action: ActionFunction = async ({ request }) => {
  const { referredCustomers, newProjects, existingProjects } = await request.json();
  return calculateResponse(referredCustomers, newProjects, existingProjects);
};

// Function to calculate the response
const calculateResponse = (referredCustomers: number, newProjects: number, existingProjects: number) => {
  const referralPayoutRate = 0.20;
  const customerChurnRate = 0.02;

  const calculateMonthlyIncome = (newProjects: number, existingProjects: number) => {
    return (newProjects * 95) + (existingProjects * 0.25);
  };

  const calculateAffiliateEarnings = (totalMonthlyIncome: number) => {
    return totalMonthlyIncome * referralPayoutRate;
  };

  const generateMonthlyData = () => {
    const data = [];
    let totalReferredCustomers = 0;
    let totalExistingProjects = existingProjects;

    const startMonth = new Date(2024, 7); // August 2024

    // 13 because august + 12 in the future
    for (let i = 0; i < 13; i++) {
      totalReferredCustomers = (totalReferredCustomers + referredCustomers) * (1 - customerChurnRate);
      totalExistingProjects += referredCustomers * newProjects;

      const totalMonthlyIncome = calculateMonthlyIncome(newProjects, totalExistingProjects) * totalReferredCustomers;
      const affiliateEarnings = calculateAffiliateEarnings(totalMonthlyIncome);

      const month = new Date(startMonth);
      month.setMonth(startMonth.getMonth() + i);

      data.push({
        name: month.toLocaleString('default', { month: 'short', year: i === 0 || month.getMonth() === 0 ? 'numeric' : undefined }),
        income: parseFloat(affiliateEarnings.toFixed(2)) // Format to 2 decimal places
      });
    }

    return data;
  };

  const monthlyData = generateMonthlyData();
  const incomeAfterOneYear = monthlyData[monthlyData.length - 1].income;

  return json({ monthlyData, incomeAfterOneYear });
};