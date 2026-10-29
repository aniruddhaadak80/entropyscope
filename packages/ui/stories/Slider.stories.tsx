import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "../src/components/Slider";

const meta: Meta<typeof Slider> = {
  title: "UI/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {},
};

export const Deterministic: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Deterministic Slider component. Seed 7331.",
      },
    },
  },
};
