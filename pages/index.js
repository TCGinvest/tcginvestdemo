
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarChart2, TrendingUp, Star, LineChart } from "lucide-react";
import { LineChart as ReLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const cardOptions = [
  "Charizard 1st Ed",
  "Pikachu Illustrator",
  "Black Lotus"
];

export default function Home() {
  const [priceData, setPriceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState("Charizard 1st Ed");

  useEffect(() => {
    async function fetchPriceData(card) {
      setLoading(true);
      const dataByCard = {
        "Charizard 1st Ed": [
          { date: "Jul 1", price: 100 },
          { date: "Jul 5", price: 115 },
          { date: "Jul 10", price: 110 },
          { date: "Jul 15", price: 120 },
          { date: "Jul 20", price: 130 },
        ],
        "Pikachu Illustrator": [
          { date: "Jul 1", price: 400 },
          { date: "Jul 5", price: 405 },
          { date: "Jul 10", price: 420 },
          { date: "Jul 15", price: 430 },
          { date: "Jul 20", price: 440 },
        ],
        "Black Lotus": [
          { date: "Jul 1", price: 12000 },
          { date: "Jul 5", price: 12150 },
          { date: "Jul 10", price: 12400 },
          { date: "Jul 15", price: 12200 },
          { date: "Jul 20", price: 12500 },
        ]
      };

      await new Promise((res) => setTimeout(res, 800));
      setPriceData(dataByCard[card]);
      setLoading(false);
    }

    fetchPriceData(selectedCard);
  }, [selectedCard]);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">TCG Invest</h1>
        <nav className="space-x-4">
          <Button variant="ghost">Home</Button>
          <Button variant="ghost">Market</Button>
          <Button variant="ghost">Portfolio</Button>
          <Button variant="ghost">Login</Button>
        </nav>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-900">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <TrendingUp size={20} /> Trending Cards
            </h2>
            <ul className="text-sm space-y-1">
              <li>Pikachu Illustrator - +12%</li>
              <li>Black Lotus - +8.3%</li>
              <li>Charizard 1st Ed - +6.9%</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gray-900">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <BarChart2 size={20} /> Your Portfolio
            </h2>
            <p className="text-sm mb-2">Total Value: €12,480.50</p>
            <Button variant="outline" size="sm">View Details</Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-900">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Star size={20} /> Card Search
            </h2>
            <Input placeholder="Search cards by name..." className="bg-gray-800 text-white" />
          </CardContent>
        </Card>
      </section>

      <section className="bg-gray-900 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <LineChart size={20} /> Price Trend: {selectedCard}
        </h2>

        <div className="mb-4">
          <select
            value={selectedCard}
            onChange={(e) => setSelectedCard(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded"
          >
            {cardOptions.map((card) => (
              <option key={card} value={card}>{card}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="text-sm text-gray-400">Loading price data...</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <ReLineChart data={priceData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
            </ReLineChart>
          </ResponsiveContainer>
        )}
      </section>

      <section className="bg-gray-900 p-6 rounded-xl space-y-4">
        <h2 className="text-xl font-semibold">📬 Join the Waitlist</h2>
        <form
          action="https://formspree.io/f/mdkdejln"
          method="POST"
          className="flex flex-col md:flex-row gap-4"
        >
          <Input
            type="email"
            name="email"
            required
            placeholder="Enter your email..."
            className="bg-gray-800 text-white"
          />
          <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
            Iscriviti
          </Button>
        </form>
        <p className="text-sm text-gray-400">Riceverai aggiornamenti sui lanci e funzionalità Pro.</p>
      </section>

      <footer className="text-center text-sm text-gray-500 pt-8 border-t border-gray-800">
        © 2025 TCG Invest. All rights reserved.
      </footer>
    </div>
  );
}
