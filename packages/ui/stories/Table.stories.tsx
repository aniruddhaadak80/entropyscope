import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table } from "../src/components/Table";

const meta: Meta<typeof Table> = {
  title: "UI/Table",
  component: Table,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {},
};

export const Deterministic: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Deterministic Table component. Seed 7331.",
      },
    },
  },
};
