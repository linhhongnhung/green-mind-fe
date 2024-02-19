import { getAllCategories, getAllProducts, searchProduct } from "@/api/api";
import { PlantCard } from "@/components";
import Slide from "@/components/animations/Slide";
import { Search } from "@/components/home";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function SearchPage() {
  const router = useRouter();

  const [plantList, setPlantList] = useState<Plant[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const { key } = router.query;
  const searchData = { key: key };
  
  useEffect(() => {

    async function fetchCategoryList() {
      const categoriesList = await getAllCategories();
      setCategories(categoriesList);
    }

    async function fetchPlantList() {
      try {
        const searchDataJSON = JSON.stringify(searchData);
        const response = await searchProduct(searchDataJSON);
        setPlantList(response.products);
      } catch (error) {
        console.error("An error occurred while calling the API: ", error);
      }
    }
    fetchCategoryList();
    fetchPlantList();
  }, [key]);

  const handleCategoryChange = (categoryId: number) => {
    // Thêm hoặc loại bỏ categoryId từ mảng selectedCategories
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(categoryId)) {
        return prevCategories.filter((id) => id !== categoryId);
      } else {
        return [...prevCategories, categoryId];
      }
    });
  };

  const filteredPlantList = plantList.filter((plant) => {
    // Nếu không có category nào được chọn, hiển thị tất cả sản phẩm
    if (selectedCategories.length === 0) {
      return true;
    }

    // Nếu có ít nhất một category được chọn, chỉ hiển thị sản phẩm thuộc category đó
    return plant.categories.some((category) =>
      selectedCategories.includes(category.id)
    );
  });

  return (
    <main className="max-w-[1440px] mx-auto">
      <Search />

      <section
        className="max-w-[1280px] mx-24 mt-8 mb-2
                   grid grid-cols-4
                   max-lg:mx-12 max-sm:mx-8"

      >
        <div className="flex max-md:flex-col">
          <span className="font-bold md:text-tiny mr-8">Filter:</span>
          {categories.map((category) => (
            <div className="min-w-[196px]" key={category.id}>
              <input
                type="checkbox"
                id={category.id.toString()}
                onChange={() => handleCategoryChange(category.id)}
              />
              <label
                className="md:text-tiny ml-2"
                htmlFor={category.id.toString()}
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </section>

      <section
        className="max-w-[1280px] mx-24 my-12
                   grid grid-cols-4
                   max-lg:grid-cols-3 max-sm:grid-cols-2 max-md:mx-4 max-lg:mx-6"

      >
        {filteredPlantList.map((plant, index) => {
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
}

interface Plant {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  categories: Category[];
}

interface Category {
  id: number;
  name: string;
  description: string;
}