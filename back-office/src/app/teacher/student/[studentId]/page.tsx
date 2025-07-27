"use client";

import { useParams, useRouter } from "next/navigation";

import { mockDataService } from "@/services/mockDataService";
import { useState } from "react";

export default function StudentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const studentId = parseInt(params.studentId as string);

  // Dropdown state'leri
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [reportData, setReportData] = useState(() => {
    // Mevcut rapor varsa onu kullan, yoksa varsayılan değerler
    return (
      mockDataService.dailyReports[studentId] || {
        kahvalti: "yemedi",
        ogleYemegi: "yemedi",
        ikindi: "yemedi",
        etkinlikKatilimi: "katilmadi",
        duyguDurumu: "mutsuz",
        genelUyum: "uyumsuz",
        arkadaslarlaIletisim: "kotu",
      }
    );
  });

  // İlaç state'i
  const [medicationData, setMedicationData] = useState(() => {
    return mockDataService.medications[studentId] || [];
  });

  // Öğrenciyi bul
  const findStudent = () => {
    for (const classId in mockDataService.students) {
      const student = mockDataService.students[classId].find(
        (s) => s.id === studentId
      );
      if (student) return student;
    }
    return null;
  };

  const student = findStudent();

  if (!student) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Öğrenci bulunamadı
        </h1>
        <button
          onClick={() => router.back()}
          className="px-6 py-3 bg-purple-500 text-white rounded-xl font-semibold"
        >
          Geri Dön
        </button>
      </div>
    );
  }

  // Dropdown işlevleri
  const handleDropdownToggle = (field: string) => {
    setOpenDropdown(openDropdown === field ? null : field);
  };

  const handleStatusChange = (field: string, value: string) => {
    setReportData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setOpenDropdown(null);
  };

  // İlaç durumu değiştirme
  const handleMedicationToggle = (medicationId: number) => {
    setMedicationData((prev) =>
      prev.map((med) =>
        med.id === medicationId ? { ...med, taken: !med.taken } : med
      )
    );
  };

  // Dropdown seçenekleri
  const getDropdownOptions = (category: string) => {
    const options = mockDataService.iconMapping[category];
    return Object.keys(options || {});
  };

  // Seçenek labelları
  const getOptionLabel = (category: string, value: string | null) => {
    if (value === null) return "Bilgi girilmemiş";

    const labels: Record<string, Record<string, string>> = {
      yemek: {
        yedi: "Yedi",
        "az-yedi": "Az Yedi",
        yemedi: "Yemedi",
      },
      duygu: {
        mutlu: "Mutlu",
        "az-mutlu": "Az Mutlu",
        mutsuz: "Mutsuz",
      },
      uyum: {
        uyumlu: "Uyumlu",
        "kismen-uyumlu": "Kısmen Uyumlu",
        uyumsuz: "Uyumsuz",
      },
      iletisim: {
        iyi: "İyi",
        orta: "Orta",
        kotu: "Kötü",
      },
      etkinlik: {
        katildi: "Katıldı",
        "kismen-katildi": "Kısmen Katıldı",
        katilmadi: "Katılmadı",
      },
    };
    return labels[category]?.[value] || value;
  };

  const handleBackClick = () => {
    router.back();
  };

  // Cinsiyet belirleme (isimden)
  const getGender = (name: string) => {
    const femaleNames = [
      "Ayşe",
      "Fatma",
      "Emine",
      "Zeynep",
      "Hacer",
      "Ayten",
      "Serpil",
      "Meral",
      "Sevgi",
      "Gülsüm",
      "Hatice",
      "Nurcan",
      "Selma",
      "Filiz",
      "Tülay",
      "Elif",
      "Seda",
    ];
    const firstName = name.split(" ")[0];
    return femaleNames.includes(firstName) ? "girl" : "boy";
  };

  const gender = getGender(student.name);

  // İkon ve renk bilgilerini al
  const getIconInfo = (category: string, value: string | null) => {
    // Null değer kontrolü - bilgi girilmemiş
    if (value === null) {
      return {
        icon: "AlertCircle",
        color: "text-orange-600",
        bgColor: "bg-orange-100",
      };
    }

    return (
      mockDataService.iconMapping[category]?.[value] || {
        icon: "AlertCircle",
        color: "text-gray-600",
        bgColor: "bg-gray-100",
      }
    );
  };

  // Lucide icon component'ını render et
  const renderIcon = (iconName: string, className: string = "") => {
    const iconMap: Record<string, string> = {
      Check: "✓",
      Minus: "−",
      X: "✗",
      Smile: "😊",
      Meh: "😐",
      Frown: "😢",
      Star: "⭐",
      AlertTriangle: "⚠️",
      XCircle: "❌",
      Heart: "❤️",
      Users: "👥",
      UserX: "👤",
      AlertCircle: "❓", // Null değerler için soru işareti
    };
    return <span className={className}>{iconMap[iconName] || "?"}</span>;
  };

  return (
    <div className="p-6 relative z-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-6">
          <button
            onClick={handleBackClick}
            className="flex items-center text-purple-600 hover:text-purple-800 transition-colors mr-4"
            style={{
              fontFamily: "var(--font-comfortaa), system-ui, sans-serif",
              fontWeight: "600",
            }}
          >
            ← Geri
          </button>
          <h2
            className="text-3xl font-bold text-gray-800"
            style={{
              fontFamily: "var(--font-comfortaa), system-ui, sans-serif",
              fontWeight: "700",
              letterSpacing: "0.3px",
            }}
          >
            Öğrenci Detayı
          </h2>
        </div>

        {/* Öğrenci Bilgi Kartı */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border-4 border-purple-100">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profil Fotoğrafı */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-200 shadow-lg bg-gradient-to-br from-purple-100 to-pink-100 p-2">
                <img
                  src={`https://avatar.iran.liara.run/public/${gender}?username=${student.name}`}
                  alt={student.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="absolute -top-2 -right-2 bg-purple-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                {student.age} yaş
              </div>
            </div>

            {/* Öğrenci Bilgileri */}
            <div className="flex-1 text-center md:text-left">
              <h1
                className="text-2xl font-bold text-gray-800 mb-2"
                style={{
                  fontFamily: "var(--font-comfortaa), system-ui, sans-serif",
                  fontWeight: "700",
                }}
              >
                {student.name}
              </h1>
              <div className="space-y-2">
                <p
                  className="text-gray-600"
                  style={{
                    fontFamily: "var(--font-comfortaa), system-ui, sans-serif",
                    fontWeight: "500",
                  }}
                >
                  <span className="font-semibold">Veli:</span>{" "}
                  {student.parentName}
                </p>
                <p
                  className="text-gray-600"
                  style={{
                    fontFamily: "var(--font-comfortaa), system-ui, sans-serif",
                    fontWeight: "500",
                  }}
                >
                  <span className="font-semibold">Telefon:</span>{" "}
                  {student.parentPhone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Günlük Rapor */}
      <div className="mb-8">
        <h3
          className="text-2xl font-bold text-gray-800 mb-4"
          style={{
            fontFamily: "var(--font-comfortaa), system-ui, sans-serif",
            fontWeight: "700",
          }}
        >
          Bugünkü Durum 📊
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Yemek Durumu */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-yellow-100">
            <h4 className="font-semibold text-gray-800 mb-4 text-center">
              🍽️ Yemek Durumu
            </h4>
            <div className="space-y-3">
              {Object.entries({
                kahvalti: "Kahvaltı",
                ogleYemegi: "Öğle Yemeği",
                ikindi: "İkindi",
              }).map(([key, label]) => {
                const iconInfo = getIconInfo(
                  "yemek",
                  reportData[key as keyof typeof reportData] as string
                );
                const fieldKey = key as keyof typeof reportData;

                return (
                  <div key={key} className="relative">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{label}</span>
                      <div className="relative">
                        <button
                          onClick={() => handleDropdownToggle(key)}
                          className={`w-8 h-8 rounded-full ${
                            iconInfo.bgColor
                          } flex items-center justify-center hover:scale-110 transition-transform cursor-pointer border-2 border-transparent hover:border-gray-300 ${
                            reportData[fieldKey] === null
                              ? "animate-pulse border-orange-300"
                              : ""
                          }`}
                          title={
                            reportData[fieldKey] === null
                              ? "Bilgi girilmemiş - tıklayın"
                              : ""
                          }
                        >
                          {renderIcon(
                            iconInfo.icon,
                            `text-lg ${iconInfo.color}`
                          )}
                        </button>

                        {/* Dropdown */}
                        {openDropdown === key && (
                          <div className="absolute right-0 top-10 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-50 min-w-[140px]">
                            {getDropdownOptions("yemek").map((option) => {
                              const optionInfo = getIconInfo("yemek", option);
                              return (
                                <button
                                  key={option}
                                  onClick={() =>
                                    handleStatusChange(key, option)
                                  }
                                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl transition-colors ${
                                    reportData[fieldKey] === option
                                      ? "bg-blue-50 border-l-4 border-blue-500"
                                      : ""
                                  }`}
                                >
                                  <div
                                    className={`w-6 h-6 rounded-full ${optionInfo.bgColor} flex items-center justify-center`}
                                  >
                                    {renderIcon(
                                      optionInfo.icon,
                                      `text-sm ${optionInfo.color}`
                                    )}
                                  </div>
                                  <span className="text-sm font-medium">
                                    {getOptionLabel("yemek", option)}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Genel Durum */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-100">
            <h4 className="font-semibold text-gray-800 mb-4 text-center">
              😊 Genel Durum
            </h4>
            <div className="space-y-3">
              {Object.entries({
                duyguDurumu: "Ruh Hali",
                genelUyum: "Uyum",
                arkadaslarlaIletisim: "Arkadaşlık",
              }).map(([key, label]) => {
                const categoryMap: Record<string, string> = {
                  duyguDurumu: "duygu",
                  genelUyum: "uyum",
                  arkadaslarlaIletisim: "iletisim",
                };
                const category = categoryMap[key];
                const value = reportData[
                  key as keyof typeof reportData
                ] as string;
                const iconInfo = getIconInfo(category, value);
                const fieldKey = key as keyof typeof reportData;

                return (
                  <div key={key} className="relative">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{label}</span>
                      <div className="relative">
                        <button
                          onClick={() => handleDropdownToggle(key)}
                          className={`w-8 h-8 rounded-full ${
                            iconInfo.bgColor
                          } flex items-center justify-center hover:scale-110 transition-transform cursor-pointer border-2 border-transparent hover:border-gray-300 ${
                            reportData[fieldKey] === null
                              ? "animate-pulse border-orange-300"
                              : ""
                          }`}
                          title={
                            reportData[fieldKey] === null
                              ? "Bilgi girilmemiş - tıklayın"
                              : ""
                          }
                        >
                          {renderIcon(
                            iconInfo.icon,
                            `text-lg ${iconInfo.color}`
                          )}
                        </button>

                        {/* Dropdown */}
                        {openDropdown === key && (
                          <div className="absolute right-0 top-10 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-50 min-w-[140px]">
                            {getDropdownOptions(category).map((option) => {
                              const optionInfo = getIconInfo(category, option);
                              return (
                                <button
                                  key={option}
                                  onClick={() =>
                                    handleStatusChange(key, option)
                                  }
                                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl transition-colors ${
                                    reportData[fieldKey] === option
                                      ? "bg-blue-50 border-l-4 border-blue-500"
                                      : ""
                                  }`}
                                >
                                  <div
                                    className={`w-6 h-6 rounded-full ${optionInfo.bgColor} flex items-center justify-center`}
                                  >
                                    {renderIcon(
                                      optionInfo.icon,
                                      `text-sm ${optionInfo.color}`
                                    )}
                                  </div>
                                  <span className="text-sm font-medium">
                                    {getOptionLabel(category, option)}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Etkinlik Katılımı */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-100">
            <h4 className="font-semibold text-gray-800 mb-4 text-center">
              🎨 Etkinlik
            </h4>
            <div className="text-center">
              <div className="mb-2">
                <span className="text-sm font-medium">Katılım Durumu</span>
              </div>
              <div className="relative inline-block">
                {(() => {
                  const iconInfo = getIconInfo(
                    "etkinlik",
                    reportData.etkinlikKatilimi
                  );
                  return (
                    <>
                      <button
                        onClick={() => handleDropdownToggle("etkinlikKatilimi")}
                        className={`w-12 h-12 rounded-full ${
                          iconInfo.bgColor
                        } flex items-center justify-center hover:scale-110 transition-transform cursor-pointer border-2 border-transparent hover:border-gray-300 ${
                          reportData.etkinlikKatilimi === null
                            ? "animate-pulse border-orange-300"
                            : ""
                        }`}
                        title={
                          reportData.etkinlikKatilimi === null
                            ? "Bilgi girilmemiş - tıklayın"
                            : ""
                        }
                      >
                        {renderIcon(
                          iconInfo.icon,
                          `text-2xl ${iconInfo.color}`
                        )}
                      </button>

                      {/* Dropdown */}
                      {openDropdown === "etkinlikKatilimi" && (
                        <div className="absolute left-1/2 transform -translate-x-1/2 top-14 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-50 min-w-[160px]">
                          {getDropdownOptions("etkinlik").map((option) => {
                            const optionInfo = getIconInfo("etkinlik", option);
                            return (
                              <button
                                key={option}
                                onClick={() =>
                                  handleStatusChange("etkinlikKatilimi", option)
                                }
                                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl transition-colors ${
                                  reportData.etkinlikKatilimi === option
                                    ? "bg-blue-50 border-l-4 border-blue-500"
                                    : ""
                                }`}
                              >
                                <div
                                  className={`w-6 h-6 rounded-full ${optionInfo.bgColor} flex items-center justify-center`}
                                >
                                  {renderIcon(
                                    optionInfo.icon,
                                    `text-sm ${optionInfo.color}`
                                  )}
                                </div>
                                <span className="text-sm font-medium">
                                  {getOptionLabel("etkinlik", option)}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
              <p className="text-sm text-gray-600 mt-2 capitalize">
                {reportData.etkinlikKatilimi === null
                  ? "Bilgi girilmemiş"
                  : getOptionLabel("etkinlik", reportData.etkinlikKatilimi)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* İlaç Takibi */}
      {medicationData.length > 0 && (
        <div className="mb-8">
          <h3
            className="text-2xl font-bold text-gray-800 mb-4"
            style={{
              fontFamily: "var(--font-comfortaa), system-ui, sans-serif",
              fontWeight: "700",
            }}
          >
            İlaç Takibi 💊
          </h3>
          <div className="bg-white rounded-2xl shadow-lg border-2 border-pink-100 p-6">
            <div className="grid gap-4">
              {medicationData.map((med) => (
                <div
                  key={med.id}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 ${
                    med.taken
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleMedicationToggle(med.id)}
                      className={`w-6 h-6 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer border-2 flex items-center justify-center ${
                        med.taken
                          ? "bg-green-500 border-green-600 hover:bg-green-600"
                          : "bg-red-500 border-red-600 hover:bg-red-600"
                      }`}
                    >
                      <span className="text-white text-sm font-bold">
                        {med.taken ? "✓" : "✗"}
                      </span>
                    </button>
                    <div>
                      <p className="font-semibold text-gray-800">{med.name}</p>
                      <p className="text-sm text-gray-600">Saat: {med.time}</p>
                    </div>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer hover:scale-105 ${
                      med.taken
                        ? "bg-green-200 text-green-800 hover:bg-green-300"
                        : "bg-red-200 text-red-800 hover:bg-red-300"
                    }`}
                    onClick={() => handleMedicationToggle(med.id)}
                  >
                    {med.taken ? "Verildi ✓" : "Bekliyor ⏳"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* İlaç yoksa */}
      {medicationData.length === 0 && (
        <div className="text-center bg-white rounded-2xl shadow-lg p-12 border-2 border-gray-100">
          <div className="text-6xl mb-4">💊</div>
          <h3
            className="text-xl font-bold text-gray-800 mb-2"
            style={{
              fontFamily: "var(--font-comfortaa), system-ui, sans-serif",
              fontWeight: "700",
            }}
          >
            İlaç Bilgisi Yok
          </h3>
          <p
            className="text-gray-600"
            style={{
              fontFamily: "var(--font-comfortaa), system-ui, sans-serif",
              fontWeight: "500",
            }}
          >
            Bu öğrenci için ilaç kaydı bulunmuyor.
          </p>
        </div>
      )}

      {/* Dropdown dışında tıklanınca kapat */}
      {openDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpenDropdown(null)}
        />
      )}
    </div>
  );
}
