import React, { useState } from 'react';

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/enhance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la requête');
      }

      const data = await response.json();
      console.log(data);
      setPrompt(data.enhancePrompt);
      setIsLoading(false);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue lors de la soumission du prompt.');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl space-y-8 backdrop-blur-lg bg-white/10 p-8 rounded-2xl border border-white/20 shadow-2xl">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-center">
          Welcome to Prompt Enhance
        </h1>

        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            name="prompt"
            id="prompt"
            className="w-full h-64 bg-slate-800/50 text-cyan-50 placeholder-cyan-300/50 rounded-xl p-4 border border-cyan-500/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all duration-300 resize-none"
            placeholder="Enter your prompt here..."
          />
          <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-tr from-cyan-500/10 to-purple-500/10" />
        </div>

        <div className="flex justify-center">
          <button
            id="submit"
            onClick={handleSubmit}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold hover:from-cyan-400 hover:to-purple-400 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40"
            disabled={isLoading}
          >
            Enhance
          </button>
        </div>
      </div>
    </main>
  );
}
