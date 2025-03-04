import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function AthleteMealOrder() {
  const meals = [
    { name: "Prawn Chow Mein", calories: 520 },
    { name: "Caesar Salad with Chicken", calories: 450 },
    { name: "Stir Fry (Chicken/Tofu/Beef) with Mixed Veg & Rice", calories: 550 },
    { name: "Potato Salad with Grilled Salmon", calories: 480 },
    { name: "Chicken Salad with Avocado & Quinoa", calories: 520 },
    { name: "Chili Spinach Pasta with Chicken", calories: 550 },
    { name: "Smash Burger (Chicken or Beef)", calories: 600 },
    { name: "Chicken Drumsticks", calories: 400 },
    { name: "Chicken Thigh Fillets", calories: 450 }
  ];

  const flavours = ["Lemon Pepper", "Chinese Salt & Pepper", "BBQ", "Sweet & Sour", "Original"];

  const extras = [
    { name: "Boiled Egg (1)", calories: 70 },
    { name: "Extra Avocado (Half)", calories: 120 },
    { name: "Whole Wheat Bread (1 slice)", calories: 80 },
    { name: "Nut & Seed Topping", calories: 90 }
  ];

  const [selectedMeal, setSelectedMeal] = useState(meals[0].name);
  const [selectedFlavour, setSelectedFlavour] = useState("");
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const handleExtraChange = (extraName) => {
    setSelectedExtras((prev) =>
      prev.includes(extraName) ? prev.filter((e) => e !== extraName) : [...prev, extraName]
    );
  };

  const totalCalories =
    (meals.find(m => m.name === selectedMeal)?.calories || 0) +
    selectedExtras.reduce((sum, extra) => sum + (extras.find(e => e.name === extra)?.calories || 0), 0);

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Athlete Meal Order</h2>
      <Input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className="mb-2" />
      <Input placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4" />
      
      <Select onValueChange={setSelectedMeal}>
        <SelectTrigger>
          <SelectValue placeholder="Select a meal" />
        </SelectTrigger>
        <SelectContent>
          {meals.map((meal) => (
            <SelectItem key={meal.name} value={meal.name}>{meal.name} ({meal.calories} kcal)</SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <h3 className="text-lg font-semibold mt-4">Flavour (Optional)</h3>
      <Select onValueChange={setSelectedFlavour}>
        <SelectTrigger>
          <SelectValue placeholder="Select a flavour" />
        </SelectTrigger>
        <SelectContent>
          {flavours.map((flavour) => (
            <SelectItem key={flavour} value={flavour}>{flavour}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <h3 className="text-lg font-semibold mt-4">Extras (Optional)</h3>
      {extras.map((extra) => (
        <label key={extra.name} className="block mt-2">
          <input
            type="checkbox"
            checked={selectedExtras.includes(extra.name)}
            onChange={() => handleExtraChange(extra.name)}
            className="mr-2"
          />
          {extra.name} ({extra.calories} kcal)
        </label>
      ))}
      
      <Input placeholder="Additional Notes" value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-4" />
      
      <Card className="mt-4 p-2">
        <CardContent>
          <p className="font-semibold">Total Calories: {totalCalories} kcal</p>
        </CardContent>
      </Card>
      
      <Button className="mt-4 w-full">Submit Order</Button>
    </div>
  );
}
