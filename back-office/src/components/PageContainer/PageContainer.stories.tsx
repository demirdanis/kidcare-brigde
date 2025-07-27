import { Meta, StoryObj } from "@storybook/nextjs";
import { PageContainer } from "./PageContainer";
import { cardBaseTestProps } from "./PageContainer.testprops";
const meta = {
  title: "Atoms/PageContainer",
  component: PageContainer,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof PageContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { ...cardBaseTestProps },
};
