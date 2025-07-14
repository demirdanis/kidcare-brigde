// interfaces/mockData.ts

export interface Teacher {
  name: string;
  email: string;
  profilePhoto: string;
}

export interface Class {
  id: number;
  name: string;
  image: string;
  color: string;
  accent: string;
  icon: string;
}

export interface Student {
  id: number;
  name: string;
  photo: string;
  age: number;
  parentName: string;
  parentPhone: string;
}

export interface Medication {
  id: number;
  name: string;
  time: string;
  taken: boolean;
}

export interface DailyReport {
  kahvalti: "yedi" | "az-yedi" | "yemedi" | null;
  ogleYemegi: "yedi" | "az-yedi" | "yemedi" | null;
  ikindi: "yedi" | "az-yedi" | "yemedi" | null;
  etkinlikKatilimi: "katildi" | "kismen-katildi" | "katilmadi" | null;
  duyguDurumu: "mutlu" | "az-mutlu" | "mutsuz" | null;
  genelUyum: "uyumlu" | "kismen-uyumlu" | "uyumsuz" | null;
  arkadaslarlaIletisim: "iyi" | "orta" | "kotu" | null;
}

export interface IconData {
  icon: string;
  color: string;
  bgColor: string;
}

export interface IconMapping {
  yemek: {
    yedi: IconData;
    "az-yedi": IconData;
    yemedi: IconData;
  };
  etkinlik: {
    katildi: IconData;
    "kismen-katildi": IconData;
    katilmadi: IconData;
  };
  duygu: {
    mutlu: IconData;
    "az-mutlu": IconData;
    mutsuz: IconData;
  };
  uyum: {
    uyumlu: IconData;
    "kismen-uyumlu": IconData;
    uyumsuz: IconData;
  };
  iletisim: {
    iyi: IconData;
    orta: IconData;
    kotu: IconData;
  };
}

export interface MockDataService {
  teacher: Teacher;
  classes: Class[];
  students: { [classId: number]: Student[] };
  medications: { [studentId: number]: Medication[] };
  dailyReports: { [studentId: number]: DailyReport };
  iconMapping: IconMapping;
}
