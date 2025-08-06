/* eslint-disable react/no-unescaped-entities */
import { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { ConfirmationModal } from "./ConfirmationModal";
import { confirmationModalTestProps } from "./ConfirmationModal.testprops";
import { IConfirmationModal } from "./ConfirmationModal.types";

const meta = {
  title: "Molecules/ConfirmationModal",
  component: ConfirmationModal,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ConfirmationModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const ConfirmationModalParent = (args: IConfirmationModal) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleShowModal = () => {
    console.log("🔔 Show modal");
    setIsOpen(true);
  };

  const handleConfirm = () => {
    console.log("✅ User confirmed action");
    args.onConfirm?.();
    setIsOpen(false);
  };

  const handleCancel = () => {
    console.log("❌ User cancelled action");
    args.onCancel?.();
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Confirmation Modal Demo
        </h2>

        <p className="text-gray-600 mb-6 text-sm">
          Bu demo'da modal'ı açmak için butona tıklayın. Console'dan aksiyonları
          takip edebilirsiniz.
        </p>

        <button
          onClick={handleShowModal}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Modal'ı Aç
        </button>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-left">
          <h3 className="font-medium text-gray-800 mb-2">Test Durumu:</h3>
          <div className="space-y-1 text-xs text-gray-600">
            <div>• Modal Durumu: {isOpen ? "Açık" : "Kapalı"}</div>
            <div>• Başlık: "{args.title}"</div>
            <div>• Mesaj: "{args.message}"</div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        {...args}
        isOpen={isOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};

export const Primary: Story = {
  args: { ...confirmationModalTestProps },
  render: (args) => <ConfirmationModalParent {...args} />,
};
