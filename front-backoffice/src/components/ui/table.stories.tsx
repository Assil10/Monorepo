import type { Meta, StoryObj } from '@storybook/react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './table';
import { Badge } from './badge';
import { Button } from './button';
import { Checkbox } from './checkbox';

interface Payment {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  date: string;
}

const payments: Payment[] = [
  {
    id: "INV001",
    amount: 125.0,
    status: "pending",
    email: "user1@example.com",
    date: "2023-01-15",
  },
  {
    id: "INV002",
    amount: 250.0,
    status: "processing",
    email: "user2@example.com",
    date: "2023-01-20",
  },
  {
    id: "INV003",
    amount: 75.5,
    status: "success",
    email: "user3@example.com",
    date: "2023-01-25",
  },
  {
    id: "INV004",
    amount: 350.25,
    status: "failed",
    email: "user4@example.com",
    date: "2023-01-30",
  },
  {
    id: "INV005",
    amount: 125.0,
    status: "success",
    email: "user5@example.com",
    date: "2023-02-05",
  },
];

const meta = {
  title: 'UI/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: () => (
    <Table className="w-[600px]">
      <TableCaption>A list of recent payments.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell className="font-medium">{payment.id}</TableCell>
            <TableCell>{payment.status}</TableCell>
            <TableCell>{payment.email}</TableCell>
            <TableCell className="text-right">${payment.amount.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Table className="w-[600px]">
      <TableCaption>A list of recent payments.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell className="font-medium">{payment.id}</TableCell>
            <TableCell>{payment.status}</TableCell>
            <TableCell>{payment.email}</TableCell>
            <TableCell className="text-right">${payment.amount.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">
            ${payments.reduce((total, payment) => total + payment.amount, 0).toFixed(2)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const WithStatusBadges: Story = {
  render: () => (
    <Table className="w-[600px]">
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell className="font-medium">{payment.id}</TableCell>
            <TableCell>
              <Badge
                variant={
                  payment.status === "success"
                    ? "default"
                    : payment.status === "pending"
                    ? "outline"
                    : payment.status === "processing"
                    ? "secondary"
                    : "destructive"
                }
              >
                {payment.status}
              </Badge>
            </TableCell>
            <TableCell>{payment.email}</TableCell>
            <TableCell className="text-right">${payment.amount.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Table className="w-[700px]">
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell className="font-medium">{payment.id}</TableCell>
            <TableCell>
              <Badge
                variant={
                  payment.status === "success"
                    ? "default"
                    : payment.status === "pending"
                    ? "outline"
                    : payment.status === "processing"
                    ? "secondary"
                    : "destructive"
                }
              >
                {payment.status}
              </Badge>
            </TableCell>
            <TableCell>{payment.email}</TableCell>
            <TableCell className="text-right">${payment.amount.toFixed(2)}</TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                <Button variant="outline" size="sm">
                  View
                </Button>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WithSelections: Story = {
  render: () => (
    <Table className="w-[700px]">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <Checkbox />
          </TableHead>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell className="font-medium">{payment.id}</TableCell>
            <TableCell>{payment.status}</TableCell>
            <TableCell>{payment.email}</TableCell>
            <TableCell className="text-right">${payment.amount.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total Selected</TableCell>
          <TableCell className="text-right">$0.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const DenseTable: Story = {
  render: () => (
    <Table className="w-[600px]">
      <TableHeader>
        <TableRow className="h-8">
          <TableHead className="py-1">Invoice</TableHead>
          <TableHead className="py-1">Date</TableHead>
          <TableHead className="py-1">Status</TableHead>
          <TableHead className="py-1 text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map((payment) => (
          <TableRow key={payment.id} className="h-8">
            <TableCell className="py-1 font-medium">{payment.id}</TableCell>
            <TableCell className="py-1">{payment.date}</TableCell>
            <TableCell className="py-1">
              <Badge
                variant={
                  payment.status === "success"
                    ? "default"
                    : payment.status === "pending"
                    ? "outline"
                    : payment.status === "processing"
                    ? "secondary"
                    : "destructive"
                }
                className="text-xs px-1 py-0"
              >
                {payment.status}
              </Badge>
            </TableCell>
            <TableCell className="py-1 text-right">${payment.amount.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}; 