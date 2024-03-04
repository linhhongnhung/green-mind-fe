import { getAllProducts } from "@/api";
import { PlantCard } from "@/components";
import { Search } from "@/components/home";
import React, { useEffect, useState } from "react";

interface Plant {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

const Category: React.FC = () => {
  const [plantList, setPlantList] = useState<Plant[]>([]);

  useEffect(() => {
    async function fetchPlantList() {
      try {
        const response = await getAllProducts();
        setPlantList(response);
      } catch (error) {
        console.error("An error occurred while calling the API: ", error);
      }
    }

    fetchPlantList();
  }, []);

  return (
    <main className="max-w-[1440px] mx-auto">
      <Search />
      <section className="max-w-[1280px] mx-24 my-12 grid grid-cols-4">
        {plantList.map((plant, index) => {
          return (
            <PlantCard
              key={plant.id}
              image={plant.image}
              name={plant.name}
              price={plant.price}
              href={`/product/${plant.id}`}
            />
          );
        })}
      </section>
    </main>
  );
};

export default Category;
