import { Search, Products, Categories, AboutUs, Feedback } from "."
export default function Home() {
    return (
        <main className="">
            <Search />
            <Products />
            <AboutUs />
            <Categories />
            <Feedback />
        </main>
    )
}