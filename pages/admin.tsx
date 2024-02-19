import React, { useEffect } from 'react'
import { Admin, Resource } from 'react-admin'
import simpleRestProvider from 'ra-data-simple-rest'
import { OrdersList, UpdateOrder } from '@/components/orders/Orders'
import { ProductsList, CreateProduct, EditProduct } from '@/components/products/Products'
import { CategoriesList, EditCategory, CreateCategory } from '@/components/categories/Categories'
import { useRouter } from 'next/router'
import { useCheckAdminAuth } from '@/components/authentication/AdminAuthContext'
import { Statistics } from '@/components/statistics/Statistics'
export default function AdminPage() {

    const router = useRouter();

    const admin = useCheckAdminAuth();
    if (!admin) {
      router.push("/login");
    }
    
    useEffect(() => {
        if (!admin) {
          router.push("/login");
        }
    }, [])

    return (
        <main className="">
            <Admin dataProvider={simpleRestProvider('https://green-mind-be-production.up.railway.app')}>
                <Resource name="products" list={ProductsList} create={CreateProduct} edit={EditProduct} />
                <Resource name="categories" list={CategoriesList} create={CreateCategory} edit={EditCategory} />
                <Resource name="order" list={OrdersList} edit={UpdateOrder} />
                <Resource name="statistics" list={Statistics} />
            </Admin>
        </main>
    )
}