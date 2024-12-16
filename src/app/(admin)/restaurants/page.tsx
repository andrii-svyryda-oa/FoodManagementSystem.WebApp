"use client";

import { ManageRestaurantsTable } from "@/components/restaurants/restaurants-table";

export default function RestaurantsPage() {
  return (
    <>
      <h2 className="text-3xl mt-0 mb-6">Restaurants</h2>
      <ManageRestaurantsTable />
    </>
  );
}
