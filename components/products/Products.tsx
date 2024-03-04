import { getCategoriesByIds, getProductImageUrl } from "@/api";
import React, { useState, useEffect } from "react";
import {
  List,
  Datagrid,
  TextField,
  ListProps,
  Create,
  Edit,
  SimpleForm,
  EditButton,
  TextInput,
  ImageField,
  CheckboxGroupInput,
  ReferenceArrayInput,
} from "react-admin";
import { Cloudinary } from "@cloudinary/url-gen";
import { CloudinaryUploadWidget } from "..";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";

interface Products {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  categoryProducts: any;
}

interface EditProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  categoryProducts: any;
}

interface ProductsProps extends ListProps {
  data: Products[];
}

interface EditProductsProps extends ListProps {
  data: EditProduct[];
  record: EditProduct;
}

export const ProductsList: React.FC<ProductsProps> = (props) => (
  <List {...props}>
    <Datagrid size="medium">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <TextField source="price" />
      <TextField source="quantity" />

      <EditButton />
    </Datagrid>
  </List>
);

export const CreateProduct: React.FC<ProductsProps> = (props) => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const handleCategoryChange = (selectedValues: any) => {
    const numericValues = selectedValues.map(Number);
    setSelectedCategories(numericValues);
  };

  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dmwxkptur");
  const [uploadPreset] = useState("fhfkedgf");

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
  });

  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });
  const productImage = cld.image(publicId);

  const transform = async (data: any) => {
    const categoriesList = await getCategoriesByIds(selectedCategories);
    const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`;
    return {
      ...data,
      image: imageUrl,
      categories: categoriesList,
    };
  };

  return (
    <Create {...props} transform={transform}>
      <SimpleForm>
        <TextInput source="id" />
        <TextInput source="name" />
        <TextInput source="description" />
        <TextInput source="price" />
        <TextInput source="quantity" />

        <ReferenceArrayInput
          label="Categories"
          reference="categories"
          source="categoryProducts"
        >
          <CheckboxGroupInput
            optionText="name"
            onChange={handleCategoryChange}
          />
        </ReferenceArrayInput>
        <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />

        <div style={{ width: "800px" }}>
          <AdvancedImage
            style={{ maxWidth: "100%" }}
            cldImg={productImage}
            plugins={[responsive(), placeholder()]}
          />
        </div>
      </SimpleForm>
    </Create>
  );
};

export const EditProduct: React.FC<EditProductsProps> = (props) => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const handleCategoryChange = (selectedValues: any) => {
    const numericValues = selectedValues.map(Number);
    setSelectedCategories(numericValues);
  };

  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dmwxkptur");
  const [uploadPreset] = useState("fhfkedgf");

  const extractIdFromUrl = () => {
    const currentPath = window.location.href;
    const matches = currentPath.match(/\/products\/(\d+)$/);
    if (matches && matches.length > 1) {
      return matches[1];
    }
    return null;
  };
  const id = extractIdFromUrl();

  useEffect(() => {
    const getImageUrl = async () => {
      try {
        const url = await getProductImageUrl(Number(id));
        const publicIdFromURL = url.split("plants/");
        setPublicId(publicIdFromURL[1]);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    if (id) {
      getImageUrl();
    }
  }, [id]);

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
  });

  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const productImage = cld.image(publicId);

  const transform = async (data: any) => {
    const categoriesList = await getCategoriesByIds(selectedCategories);
    const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/plants/${publicId}`;

    return {
      ...data,
      image: imageUrl,
      categories: categoriesList,
    };
  };

  return (
    <Edit {...props} transform={transform}>
      <SimpleForm>
        <TextInput source="id" disabled />
        <TextInput source="name" />
        <TextInput source="description" fullWidth />
        <TextInput source="price" />
        <TextInput source="quantity" />

        <ReferenceArrayInput
          label="Categories"
          reference="categories"
          source="categoryProducts"
        >
          <CheckboxGroupInput
            optionText="name"
            onChange={handleCategoryChange}
            source="id"
          />
        </ReferenceArrayInput>

        <ImageField source="image" />

        <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />

        <div style={{ width: "800px" }}>
          <AdvancedImage
            style={{ maxWidth: "100%" }}
            cldImg={productImage}
            plugins={[responsive(), placeholder()]}
          />
        </div>
      </SimpleForm>
    </Edit>
  );
};

export const ProductsListForAdmin2: React.FC<ProductsProps> = (props) => (
  <List {...props}>
    <Datagrid size="medium">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <TextField source="price" />
      <TextField source="quantity" />
    </Datagrid>
  </List>
);
