import type { Meta, StoryObj } from "@storybook/react-vite";
import { Chart } from "../src/components/Chart";

const meta: Meta<typeof Chart> = {
  title: "UI/Chart",
  component: Chart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Chart>;

export const Default: Story = {
  args: {},
};

export const Deterministic: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Deterministic Chart component. Seed 7331.",
      },
    },
  },
};
