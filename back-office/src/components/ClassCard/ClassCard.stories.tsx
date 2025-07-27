import { Meta, StoryObj } from "@storybook/nextjs";
import { ClassCard } from "./ClassCard";
import { cardBaseTestProps } from "./ClassCard.testprops";
import { PageContainer } from "../PageContainer/PageContainer";
const meta = {
  title: "Molecules/ClassCard",
  component: ClassCard,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
  args: {},
  decorators: [
    (Story) => (
      <PageContainer className="p-5">
        <Story />
      </PageContainer>
    ),
  ],
} satisfies Meta<typeof ClassCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { ...cardBaseTestProps },
};
