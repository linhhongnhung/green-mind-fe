import CategoryItem from "./CategoryItem"

const Categories: React.FC = () => {
    return (
        <section className="text-center">
            <div className="max-w-[1440px] mx-auto">
                <div className="grid grid-cols-3 gap-24
                                absolute
                                mt-[135px] mx-24
                                max-w-[1248px]
                                max-xl:mx-12 max-xl:gap-10
                                max-sm:mx-6 max-sm:grid-cols-1 max-sm:right-0 max-sm:left-0">
                    {
                        categories.map((category, index) => {
                            return <CategoryItem
                                key={index}
                                img={category.img}
                                name={category.name}
                                desc={category.desc} />
                                // href={category.href} />
                        })
                    }
                </div>
            </div>
            <h2 className="text-base font-bold">Categories</h2>
            <p className="mt-3 mb-24 text-gray md:text-tiny max-sm:mb-12">Find what you are looking for</p>
            <div className="bg-primary h-[746px]
                            max-xl:h-[726px]
                            max-lg:h-[650px]
                            max-md:h-[600px]
                            max-sm:h-[1480px]" />
        </section>
    )
}

export default Categories

const categories = [
    {
        img: "./img/Frame39.svg",
        name: "Outdoor Plants",
        desc: "These plants are often placed outdoors, like gardens, where there is a lot of light.",
        href: "/category/1"
    },
    {
        img: "./img/Frame38.svg",
        name: "Hanging Plants",
        desc: "The plants hanging high above are extremely graceful.",
        href: "/category/3"
    },
    {
        img: "./img/Frame37.svg",
        name: "Indoor Plants",
        desc: "Plants are often placed indoors, the light intensity is not too high.",
        href: "/category/2"
    }
]
