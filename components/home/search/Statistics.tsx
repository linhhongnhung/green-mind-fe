import React from 'react'

interface StatisticsProps {
    amount: string
    type: string
}

const Statistics: React.FC<StatisticsProps> = (props) => {
    const { amount, type } = props
    return (
        <div className="mr-12">
            <p className="text-base">{amount}+</p>
            <p className="text-tiny">{type}</p>
        </div>
    )
}

export default Statistics