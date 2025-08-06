import { IConfirmationModal } from "./ConfirmationModal.types";

export const confirmationModalTestProps: IConfirmationModal = {
  isOpen: true,
  title: "Plan Tipini Değiştir",
  message:
    "Girilen verileriniz var ve kaybolacaktır. Devam etmek istiyor musunuz?",
  onConfirm: () => {
    console.log("✅ Confirmed action");
  },
  onCancel: () => {
    console.log("❌ Cancelled action");
  },
};
