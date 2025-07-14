"use client";

import { Home, LogOut, Menu, Settings, Users, X } from "lucide-react";

import { mockDataService } from "@/services/mockDataService";
import { useState } from "react";

export default function MobileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, 
            rgba(252, 231, 243, 0.8) 0%,
            rgba(233, 213, 255, 0.6) 25%,
            rgba(219, 234, 254, 0.7) 50%,
            rgba(254, 249, 195, 0.5) 75%,
            rgba(236, 254, 255, 0.8) 100%
          ),
          linear-gradient(45deg,
            rgba(255, 182, 193, 0.1) 0%,
            rgba(221, 160, 221, 0.1) 50%,
            rgba(173, 216, 230, 0.1) 100%
          )
        `,
      }}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-200 rounded-full opacity-15 blur-md animate-pulse"></div>
        <div
          className="absolute top-32 right-20 w-16 h-16 bg-pink-200 rounded-full opacity-20 blur-md animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-purple-200 rounded-full opacity-12 blur-md animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-40 right-10 w-18 h-18 bg-blue-200 rounded-full opacity-18 blur-md animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-5 w-12 h-12 bg-green-200 rounded-full opacity-15 blur-md animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-20 right-1/3 w-14 h-14 bg-rose-200 rounded-full opacity-10 blur-lg animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute bottom-32 left-20 w-16 h-16 bg-violet-200 rounded-full opacity-16 blur-md animate-pulse"
          style={{ animationDelay: "2.5s" }}
        ></div>
      </div>

      <header className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-white shadow-xl relative z-40 rounded-b-3xl">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={toggleMenu}
              className="p-3 rounded-2xl transition-all duration-300 transform hover:scale-105"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "white",
              }}
            >
              <Menu size={24} />
            </button>
            <h1
              className="text-xl font-bold tracking-wide"
              style={{
                fontFamily: "var(--font-comfortaa), system-ui, sans-serif",
                fontWeight: "600",
                letterSpacing: "0.5px",
              }}
            >
              KidCare Bridge
            </h1>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-white border-opacity-30 overflow-hidden">
                <img
                  src={mockDataService.teacher.profilePhoto}
                  alt="Öğretmen Profil"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:block">
                <p
                  className="text-sm font-semibold"
                  style={{
                    fontFamily: "var(--font-comfortaa), system-ui, sans-serif",
                    fontWeight: "600",
                  }}
                >
                  {mockDataService.teacher.name}
                </p>
                <p className="text-xs text-white text-opacity-80">
                  {mockDataService.teacher.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {showMenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-50 backdrop-blur-sm"
          onClick={closeMenu}
        >
          <div
            className="bg-white w-80 h-full shadow-2xl transform transition-all duration-500 ease-out rounded-r-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-pink-400 to-purple-400 text-white p-6 rounded-tr-3xl">
              <div className="flex items-center justify-between mb-6">
                <h2
                  className="text-xl font-bold"
                  style={{
                    fontFamily: "var(--font-comfortaa), system-ui, sans-serif",
                    fontWeight: "600",
                  }}
                >
                  Menü
                </h2>
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-white border-opacity-30 overflow-hidden">
                  <img
                    src={mockDataService.teacher.profilePhoto}
                    alt="Öğretmen Profil"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3
                    className="font-bold text-lg"
                    style={{
                      fontFamily:
                        "var(--font-comfortaa), system-ui, sans-serif",
                      fontWeight: "600",
                    }}
                  >
                    {mockDataService.teacher.name}
                  </h3>
                  <p className="text-sm text-white text-opacity-80">
                    {mockDataService.teacher.email}
                  </p>
                </div>
              </div>
            </div>

            <nav className="p-6">
              <div className="space-y-3">
                <button
                  onClick={closeMenu}
                  className="w-full flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 transition-all duration-300 text-left transform hover:scale-105"
                >
                  <Home size={22} className="text-pink-500" />
                  <span
                    className="font-semibold text-gray-700"
                    style={{
                      fontFamily:
                        "var(--font-comfortaa), system-ui, sans-serif",
                      fontWeight: "600",
                    }}
                  >
                    Ana Sayfa
                  </span>
                </button>
                <button
                  onClick={closeMenu}
                  className="w-full flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 text-left transform hover:scale-105"
                >
                  <Users size={22} className="text-blue-500" />
                  <span
                    className="font-semibold text-gray-700"
                    style={{
                      fontFamily:
                        "var(--font-comfortaa), system-ui, sans-serif",
                      fontWeight: "600",
                    }}
                  >
                    Sınıflarım
                  </span>
                </button>
                <button
                  onClick={closeMenu}
                  className="w-full flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-green-50 to-teal-50 hover:from-green-100 hover:to-teal-100 transition-all duration-300 text-left transform hover:scale-105"
                >
                  <Settings size={22} className="text-green-500" />
                  <span
                    className="font-semibold text-gray-700"
                    style={{
                      fontFamily:
                        "var(--font-comfortaa), system-ui, sans-serif",
                      fontWeight: "600",
                    }}
                  >
                    Ayarlar
                  </span>
                </button>
                <div className="border-t border-gray-200 my-6"></div>
                <button
                  onClick={closeMenu}
                  className="w-full flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 text-red-600 transition-all duration-300 text-left transform hover:scale-105"
                >
                  <LogOut size={22} />
                  <span
                    className="font-semibold"
                    style={{
                      fontFamily:
                        "var(--font-comfortaa), system-ui, sans-serif",
                      fontWeight: "600",
                    }}
                  >
                    Çıkış Yap
                  </span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}

      <main className="relative z-10">{children}</main>
    </div>
  );
}
