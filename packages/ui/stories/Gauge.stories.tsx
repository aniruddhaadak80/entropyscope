import type { Meta, StoryObj } from "@storybook/react-vite";
import { Gauge } from "../src/components/Gauge";

const meta: Meta<typeof Gauge> = {
  title: "UI/Gauge",
  component: Gauge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Gauge>;

export const Default: Story = {
  args: {},
};

export const Deterministic: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Deterministic Gauge component. Seed 7331.",
      },
    },
  },
};
