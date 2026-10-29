import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stat } from "../src/components/Stat";

const meta: Meta<typeof Stat> = {
  title: "UI/Stat",
  component: Stat,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Stat>;

export const Default: Story = {
  args: {},
};

export const Deterministic: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Deterministic Stat component. Seed 7331.",
      },
    },
  },
};
