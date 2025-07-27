import { Meta, StoryObj } from "@storybook/nextjs";
import { PageTitle } from "./PageTitle";
import { pageTitleTestProps } from "./PageTitle.testprops";
const meta = {
  title: "Atoms/PageTitle",
  component: PageTitle,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof PageTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { ...pageTitleTestProps },
};
