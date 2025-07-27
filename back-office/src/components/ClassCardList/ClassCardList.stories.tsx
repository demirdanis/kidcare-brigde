import { Meta, StoryObj } from "@storybook/nextjs";
import { PageContainer } from "../PageContainer/PageContainer";
import { ClassCardList } from "./ClassCardList";
import { classCardListProps } from "./ClassCardList.testprops";

const meta = {
  title: "Sections/ClassCardList",
  component: ClassCardList,
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
} satisfies Meta<typeof ClassCardList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { ...classCardListProps },
};
