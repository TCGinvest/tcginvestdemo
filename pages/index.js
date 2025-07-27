
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const placeholderImg = "/backface.webp";

export default function Home() {
  const [portfolio, setPortfolio] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [chartData, setChartData] = useState([]);

  const cards = [
    { id: "1", name: "Charizard", price: 120, image: placeholderImg },
    { id: "2", name: "Pikachu", price: 80, image: placeholderImg },
    { id: "3", name: "Black Lotus", price: 15000, image: placeholderImg }
  ];

  useEffect(() => {
    if (!selectedCard) return;
    const base = selectedCard.price;
    const simulated = Array.from({ length: 5 }, (_, i) => ({
      date: `Jul ${i * 4 + 1}`,
      price: parseFloat((base * (0.95 + Math.random() * 0.1)).toFixed(2)),
    }));
    setChartData(simulated);
  }, [selectedCard]);

  const addToPortfolio = (card) => {
    setPortfolio((prev) => {
      const found = prev.find((c) => c.id === card.id);
      if (found) {
        return prev.map((c) => (c.id === card.id ? { ...c, quantity: c.quantity + 1 } : c));
      }
      return [...prev, { ...card, quantity: 1 }];
    });
  };

  const removeFromPortfolio = (id) => {
    setPortfolio((prev) => prev.filter((c) => c.id !== id));
  };

  const totalValue = portfolio.reduce((sum, c) => sum + c.price * c.quantity, 0);

  return (
    <div style={{ fontFamily: "Arial", backgroundColor: "#111827", color: "white", minHeight: "100vh", padding: "2rem" }}>
      <Head>
        <title>TCG Invest – Portfolio</title>
      </Head>

      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>📈 TCG Invest</h1>

      <h2 style={{ marginTop: "2rem" }}>Carte disponibili</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {cards.map((card) => (
          <li key={card.id} style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}>
            <img src={card.image} alt={card.name} style={{ width: 60, marginRight: 10 }} />
            <div>
              <strong>{card.name}</strong> – €{card.price}
              <button onClick={() => addToPortfolio(card)} style={{ marginLeft: "1rem", padding: "0.3rem 0.6rem" }}>
                ➕ Aggiungi
              </button>
              <button onClick={() => setSelectedCard(card)} style={{ marginLeft: "0.5rem", padding: "0.3rem 0.6rem" }}>
                📊 Andamento
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h2>📂 Portfolio</h2>
      {portfolio.length === 0 ? (
        <p>Nessuna carta nel portafoglio.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {portfolio.map((card) => (
            <li key={card.id} style={{ marginBottom: "0.5rem" }}>
              {card.name} x{card.quantity} – €{(card.price * card.quantity).toFixed(2)}
              <button onClick={() => removeFromPortfolio(card.id)} style={{ marginLeft: "1rem" }}>🗑️</button>
            </li>
          ))}
        </ul>
      )}
      <p><strong>Totale portafoglio:</strong> €{totalValue.toFixed(2)}</p>

      {selectedCard && (
        <div style={{ marginTop: "2rem", background: "#1f2937", padding: "1rem", borderRadius: "8px" }}>
          <h3>Andamento Prezzi: {selectedCard.name}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
