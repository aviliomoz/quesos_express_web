import React, { useState } from "react";

// Tipos para los componentes
type OrderProps = {
  product: string;
  customer: string;
  time: string;
  completed: boolean;
};

const Calendar: React.FC = () => {
  return (
    <div className="">
      <h2 className="text-base font-semibold mb-3">Calendario de pedidos</h2>
      <div className="month">
        <h3 className="text-sm font-medium mb-2">Mayo 2024</h3>
        <div className="grid grid-cols-7 gap-3 text-center text-xs p-2">
          <span>lun</span>
          <span>mar</span>
          <span>mié</span>
          <span>jue</span>
          <span>vie</span>
          <span>sáb</span>
          <span>dom</span>
          <span className="text-gray-400">29</span>
          <span className="text-gray-400">30</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
          <span>10</span>
          <span>11</span>
          <span>12</span>
          <span>13</span>
          <span>14</span>
          <span>15</span>
          <span>16</span>
          <span>17</span>
          <span>18</span>
          <span>19</span>
          <span>20</span>
          <span>21</span>
          <span>22</span>
          <span>23</span>
          <span>24</span>
          <span>25</span>
          <span>26</span>
          <span className="bg-gray-800 text-white rounded-md py-1">27</span>
          <span>28</span>
          <span>29</span>
          <span>30</span>
          <span>31</span>
          <span className="text-gray-400">1</span>
          <span className="text-gray-400">2</span>
        </div>
      </div>
    </div>
  );
};

const Order: React.FC<OrderProps> = ({
  product,
  customer,
  time,
  completed,
}) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 flex justify-between items-center shadow-sm">
      <div>
        <p className="font-medium">
          <strong>Producto:</strong> {product}
        </p>
        <p className="text-gray-600">
          <strong>Cliente:</strong> {customer}
        </p>
        <p className="text-gray-600">
          <strong>Hora:</strong> {time}
        </p>
      </div>
      <div
        className={`text-sm ${completed ? "text-blue-500" : "text-gray-400"}`}
      >
        {completed ? "✔" : "○"}
      </div>
    </div>
  );
};

const OrdersCalendar: React.FC = () => {
  const [orders] = useState<OrderProps[]>([
    {
      product: "Queso fresco",
      customer: "Avilio Muñoz",
      time: "07:00 p.m.",
      completed: true,
    },
    {
      product: "Queso fresco",
      customer: "Avilio Muñoz",
      time: "07:00 p.m.",
      completed: false,
    },
  ]);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl space-y-4 text-sm">
      <Calendar />
      <h2 className="text-base font-semibold mb-4">Pedidos:</h2>
      {orders.map((order, index) => (
        <Order key={index} {...order} />
      ))}
    </div>
  );
};

export default OrdersCalendar;
