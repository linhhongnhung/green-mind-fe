import Slide from "@/components/animations/Slide"

interface ServiceProps {
    icon: string
    title: string
    desc: string
    index: number
}

const Service: React.FC<ServiceProps> = (props) => {
    const { icon, title, desc, index } = props
    return (
        <Slide key={index} index={index} direction="up">
            <div className="hover:scale-110 transition duration-300">
                <div className="w-24 h-24 mx-auto bg-primary rounded-full flex
                                max-md:w-16 max-md:h-16 max-md:p-4
                                max-sm:w-14 max-sm:h-14">
                    <img className="m-auto" src={icon} alt="icon" />
                </div>
                <h3 className="mt-6 mb-3 font-bold md:text-tiny max-md:mt-2 max-md:mb-1">{title}</h3>
                <p className="text-gray md:text-tiny">{desc}</p>
            </div>
        </Slide>
    )
}

export default Service