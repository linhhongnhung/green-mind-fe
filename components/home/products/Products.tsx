import React, { useEffect, useState } from "react"
import { Button, PlantCard } from "@/components"
import Slide from "@/components/animations/Slide"
import { getAllProducts } from "@/api/api";

const Products: React.FC = () => {
    const [plantList, setPlantList] = useState<Plant[]>([]);

    useEffect(() => {
      async function fetchPlantList() {
        try {
          const response = await getAllProducts();
          setPlantList(response.slice(-3));
        } catch (error) {
          console.error("An error occurred while calling the API: ", error);
        }
      }
  
      fetchPlantList();
    }, []);
    return (
        <section className="pt-[93px] pb-[113px] max-w-[1440px] mx-auto">
            <div className="mx-24 flex
                            max-lg:flex-col max-lg:items-center max-lg:text-center
                            max-md:mx-12
                            max-sm:mx-6">
                <div>
                    <h2 className="text-base font-extrabold
                                    w-[256px]
                                    max-lg:w-auto">
                        Explore
                    </h2>
                    <p className="md:text-tiny text-gray w-[196px] mt-3 mb-6
                                  max-lg:w-auto">
                        Easiest way to healthy life by buying your favorite plants
                    </p>
                    <Button key=""
                            href="/products"
                            text="See more"
                            onClick={()=>{}}
                    />
                </div>
                <div className="grid grid-cols-3
                                max-lg:grid-cols-2 max-lg:mt-4
                                max-md:grid-cols-1">
                    {
                        plantList.map((plant, index) => {
                            return <Slide key={index} index={index} direction="right">
                                        <PlantCard
                                            key={index}
                                            image={plant.image}
                                            name={plant.name}
                                            price={plant.price}
                                            href={`/product/${plant.id}`}
                                        />
                                    </Slide>
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default Products

interface Plant {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
  }