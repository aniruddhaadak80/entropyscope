import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../src/components/Button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {},
};

export const Deterministic: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Deterministic Button component. Seed 7331.",
      },
    },
  },
};
