import React from "react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

export default function Dialogue({ open, onClose }) {
  const navigate = useNavigate();
  const handleDone = async () => {
    navigate("/recipe", {
      state: {
        timeSlot,
        foodCategory,
        basket,
      },
    });
  };

  const [timeSlot, setTimeSlot] = useState("");
  const [foodCategory, setFoodCategory] = useState("");
  const [menuType, setMenuType] = useState("vegetables");
  const [basket, setBasket] = useState([]);

  const vegetables = [
  "🥕 Carrot",
  "🥔 Potato",
  "🍅 Tomato",
  "🥒 Cucumber",
  "🌽 Corn",
  "🥦 Broccoli",
  "🥬 Spinach",
  "🍆 Eggplant",
  "🧅 Onion",
  "🫑 Capsicum",
  "🫚 Ginger",
  "🧄 Garlic",
  "🥕 Beetroot",
  "🥔 Sweet Potato"
];

  const nonvegetables = [
  "🍗 Chicken",
  "🐟 Fish",
  "🥩 Mutton",
  "🍖 Meat",
  "🍤 Prawns",
  "🥚 Egg",
  "🦀 Crab"
];

const masalas = [
  "🌶️ Chilli",
  "🧄 Garlic",
  "🧂 Salt",
  "🧄 Pepper",
  "🥄 Turmeric",
  "🥄 Coriander Powder",
  "🥄 Cumin",
  "🥄 Garam Masala",
  "🥄 Mustard Seeds",
  "🥄 Curry Leaves"
];

  const pots = [
  "🍳 Frying Pan",
  "🥘 Kadai",
  "🍲 Cooking Pot",
  "🥣 Bowl",
  "🫕 Saucepan",
  "🥄 Ladle"
];

  if (!open) return null;
  // simple data
  const addItem = (item) => {
    if (!basket.includes(item)) {
      setBasket([...basket, item]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      {/* Dialog Box */}
      <div className="bg-white w-[1000px] h-[550px] rounded-lg flex flex-col">
        <div className="p-4 border-b flex justify-left gap-3 items-center">
          <div className="p-4 border-b  gap-4">
            <select
              className="border px-3 py-2 rounded"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
            >
              <option value="">Select Time</option>
              <option>15 Minutes</option>
              <option>30 Minutes</option>
              <option>45 Minutes</option>
              <option>60 Minutes</option>
            </select>
          </div>
          <div className="p-4 border-b  gap-4">
            <select
              className="border px-3 py-2 rounded"
              value={foodCategory}
              onChange={(e) => setFoodCategory(e.target.value)}
            >
              <option value="">Food Category</option>
              <option>Starter</option>
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Snack</option>
            </select>
          </div>
        </div>

        <div className="flex flex-1">
          <div className="w-1/4 bg-white-600 text-black p-4  flex flex-col gap-4">
            <button
              onClick={() => setMenuType("vegetables")}
              className="bg-orange-200 p-3"
            >
              Vegetables
            </button>
            <br />
            <button
              onClick={() => setMenuType("non-vegetables")}
              className="bg-orange-200 p-3"
            >
              Non-Vegetables
            </button>
            <br />
            <button
              onClick={() => setMenuType("masalas")}
              className="bg-orange-200 p-3"
            >
              Masalas
            </button>
            <br />
            <button
              onClick={() => setMenuType("pots")}
              className="bg-orange-200 p-3"
            >
              Pots
            </button>
          </div>
          <br />

          <div className="w-3/4 p-4">
            <h3 className="font-semibold mb-3 capitalize">{menuType}</h3>

            <div className="grid grid-cols-3 gap-3">
              {menuType === "vegetables" &&
                vegetables.map((item) => (
                  <div
                    key={item}
                    onClick={() => addItem(item)}
                    className="item-box"
                  >
                    {item}
                  </div>
                ))}
              {menuType === "non-vegetables" &&
                nonvegetables.map((item) => (
                  <div
                    key={item}
                    onClick={() => addItem(item)}
                    className="item-box"
                  >
                    {item}
                  </div>
                ))}
              {menuType === "masalas" &&
                masalas.map((item) => (
                  <div
                    key={item}
                    onClick={() => addItem(item)}
                    className="item-box"
                  >
                    {item}
                  </div>
                ))}
              {menuType === "pots" &&
                pots.map((item) => (
                  <div
                    key={item}
                    onClick={() => addItem(item)}
                    className="item-box"
                  >
                    {item}
                  </div>
                ))}
            </div>
            <div className="mt-4 border-t pt-4 text-center">
              <h4 className="font-semibold">🧺 Basket</h4>
              {basket.length === 0 ? (
                <p>No items selected</p>
              ) : (
                <p>{basket.join(", ")}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleDone}
            className="px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700"
          >
            
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
