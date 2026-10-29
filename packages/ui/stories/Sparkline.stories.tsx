import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sparkline } from "../src/components/Sparkline";

const meta: Meta<typeof Sparkline> = {
  title: "UI/Sparkline",
  component: Sparkline,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Sparkline>;

export const Default: Story = {
  args: {},
};

export const Deterministic: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Deterministic Sparkline component. Seed 7331.",
      },
    },
  },
};
