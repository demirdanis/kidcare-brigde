import { Meta, StoryObj } from "@storybook/nextjs";
import { CardBase } from "./CardBase";
import { cardBaseTestProps } from "./CardBase.testprops";
import { PageContainer } from "../PageContainer/PageContainer";
const meta = {
  title: "Atoms/CardBase",
  component: CardBase,
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
} satisfies Meta<typeof CardBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { ...cardBaseTestProps },
};
