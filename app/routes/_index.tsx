import type { MetaFunction } from "@remix-run/node";
import IncomeCalculator from "~/components/Calculator";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="font-system p-4 mt-8 flex flex-col items-center">
      <h1 className="text-3xl md:text-5xl text-gray-900 text-center font-inter-extrabold">Calculate Your Recurring</h1>
      <h1 className="text-3xl md:text-5xl text-gray-900 text-center font-inter-extrabold">Passive Income</h1>
      <div className="flex flex-col items-center">
        <IncomeCalculator />
        <p className="text-gray-500 mt-4 text-center font-inter-regular text-sm md:text-base">
          Calculations are based on the number of customers you refer each month and their avg. project volume.<br />
          Factor in our churn rate and this brings you to your estimated total passive future income.
        </p>
      </div>
    </div>
  );
}