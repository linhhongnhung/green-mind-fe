import { getOrdersByDate } from "@/api";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export const Statistics: React.FC<any> = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const handleSearch = async () => {
    // Kiểm tra tính hợp lệ của ngày bắt đầu và kết thúc
    if (!startDate || !endDate) {
      toast.error("Please enter both start and end dates.", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    const getOrdersByDateDto = {
      startDate: startDate,
      endDate: endDate,
    };

    const orderDataByDate: Order[] = await getOrdersByDate(
      JSON.stringify(getOrdersByDateDto)
    );
    console.log(orderDataByDate);

    const calculatedChartData = calculateRevenueByDay(orderDataByDate);

    setChartData(calculatedChartData);
  };

  const calculateRevenueByDay = (orders: Order[]) => {
    const revenueByDay: { [key: string]: number } = {};

    orders.forEach((order: Order) => {
      const orderDate = new Date(order.date).toLocaleDateString();
      const orderRevenue = order.total;

      // Nếu ngày đã có trong danh sách, cộng thêm tổng tiền
      if (revenueByDay[orderDate]) {
        revenueByDay[orderDate] += orderRevenue;
      } else {
        // Nếu chưa có, tạo một mục mới
        revenueByDay[orderDate] = orderRevenue;
      }
    });

    const result: { date: string; revenue: number }[] = Object.keys(
      revenueByDay
    ).map((date) => ({
      date,
      revenue: revenueByDay[date],
    }));

    return result;
  };

  return (
    <div>
      <h2 className="font-bold text-base my-8">Revenue Statistics</h2>
      <div className="flex gap-4 items-center">
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="rounded p-2 bg-[#e8e8e8]"
        />

        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="rounded p-2 bg-[#e8e8e8]"
        />

        <button
          className="px-8 py-2 bg-[#3498db] hover:opacity-[0.8] text-white"
          onClick={handleSearch}
        >
          Statistic
        </button>
      </div>

      <BarChart width={1000} height={600} data={chartData} className="p-16">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="revenue" fill="#3498db" className="" />
      </BarChart>
    </div>
  );
};

interface Order {
  id: number;
  address: string;
  phoneNumber: string;
  date: Date;
  name: string;
  paymentMethod: string;
  paymentStatus: string;
  shipmentStatus: string;
  total: number;
}

interface ChartData {
  date: string;
  revenue: number;
}
