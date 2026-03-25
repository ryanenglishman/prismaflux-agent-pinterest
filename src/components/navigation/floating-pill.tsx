"use client";

import { useState } from "react";
import { X } from "lucide-react";

type PillView = "closed" | "robin" | "menu";

export function FloatingPill() {
  const [view, setView] = useState<PillView>("closed");

  const handleRobinClick = () => {
    setView(view === "robin" ? "closed" : "robin");
  };

  const handleMenuClick = () => {
    setView(view === "menu" ? "closed" : "menu");
  };

  const handleClose = () => {
    setView("closed");
  };

  return (
    <>
      {/* Overlay blur */}
      {view !== "closed" && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md transition-opacity"
          onClick={handleClose}
        />
      )}

      {/* Overlay content */}
      {view !== "closed" && (
        <div className="fixed inset-0 z-50 flex flex-col pointer-events-none">
          <div className="flex-1 overflow-auto p-5 pb-24 pointer-events-auto">
            {view === "robin" && <RobinPanel />}
            {view === "menu" && <MenuPanel onClose={handleClose} />}
          </div>
        </div>
      )}

      {/* Floating pill */}
      <div className="fixed bottom-[33px] left-[33px] right-[33px] z-50 flex justify-center">
        <div className="flex items-center gap-0 rounded-[20px] bg-zinc-900 shadow-2xl shadow-black/20">
          {/* Robin button */}
          <button
            onClick={handleRobinClick}
            className="flex items-center gap-2.5 rounded-l-[20px] px-5 py-3 transition-colors hover:bg-zinc-800 active:bg-zinc-700"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600">
              <span className="text-sm font-bold text-white">R</span>
            </div>
            <span className="text-sm font-medium text-white">Robin</span>
          </button>

          {/* Separator */}
          <div className="h-8 w-px bg-white/10" />

          {/* P logo / menu button */}
          <button
            onClick={handleMenuClick}
            className="flex items-center justify-center rounded-r-[20px] px-5 py-3 transition-colors hover:bg-zinc-800 active:bg-zinc-700"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-700">
              <span className="text-base font-black text-white">P</span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

function RobinPanel() {
  return (
    <div className="mx-auto max-w-lg pt-12">
      <div className="rounded-3xl bg-white p-6 shadow-xl">
        {/* Robin header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600">
            <span className="text-lg font-bold text-white">R</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">Robin</h2>
            <p className="text-sm text-zinc-500">Votre copilote diffusion</p>
          </div>
        </div>

        {/* Welcome message */}
        <div className="rounded-2xl bg-zinc-50 p-4 mb-4">
          <p className="text-sm text-zinc-700 leading-relaxed">
            Bonjour ! Je suis Robin, votre copilote de diffusion.
            Ajoutez un vehicule et je m&apos;occupe de le publier sur AutoScout24,
            GoCar et 2ememain.
          </p>
        </div>

        {/* Quick action */}
        <button className="w-full rounded-2xl bg-zinc-900 px-5 py-3.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 active:bg-zinc-700">
          Ajouter un vehicule
        </button>

        {/* Status */}
        <div className="mt-4 flex items-center justify-between text-xs text-zinc-400">
          <span>3 plateformes connectees</span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Tout est a jour
          </span>
        </div>
      </div>
    </div>
  );
}

function MenuPanel({ onClose }: { onClose: () => void }) {
  const menuItems = [
    { label: "Catalogue", description: "Vos vehicules", icon: "🚗" },
    { label: "Plateformes", description: "AutoScout24, GoCar, 2ememain", icon: "📡" },
    { label: "Pierre", description: "Rapports & reputation", icon: "📊" },
    { label: "Marcus", description: "Performance site web", icon: "🌐" },
    { label: "Lana", description: "Studio photo & reseaux", icon: "📸" },
    { label: "Clips", description: "Videos publicitaires", icon: "🎬" },
    { label: "Equipe", description: "Gestion des acces", icon: "👥" },
    { label: "Abonnement", description: "Plan & facturation", icon: "💳" },
  ];

  return (
    <div className="mx-auto max-w-lg pt-8">
      {/* Close button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Menu grid */}
      <div className="grid grid-cols-2 gap-3">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className="flex flex-col items-start rounded-2xl bg-white p-4 text-left shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="text-2xl mb-2">{item.icon}</span>
            <span className="text-sm font-semibold text-zinc-900">{item.label}</span>
            <span className="text-xs text-zinc-500 mt-0.5">{item.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
