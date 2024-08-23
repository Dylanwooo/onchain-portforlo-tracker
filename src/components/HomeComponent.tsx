"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

// Placeholder data (replace this with actual API call in a real application)
const mockTokenData = [
  {
    symbol: "ETH",
    balance: "2.5",
    price: 2000,
    profitLoss7d: 150,
    profitLoss30d: -200,
    profitLoss1y: 1000,
  },
  {
    symbol: "LINK",
    balance: "100",
    price: 15,
    profitLoss7d: -20,
    profitLoss30d: 50,
    profitLoss1y: 200,
  },
  {
    symbol: "UNI",
    balance: "50",
    price: 5,
    profitLoss7d: 10,
    profitLoss30d: -15,
    profitLoss1y: 75,
  },
];

export default function HomeComponent() {
  const [address, setAddress] = useState("");
  const [tokenData, setTokenData] = useState<any>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setTokenData(mockTokenData);
      setIsLoading(false);
    }, 2000); // 2 seconds delay to show loading effect
  };

  const SkeletonRow = () => (
    <TableRow>
      {[...Array(6)].map((_, i) => (
        <TableCell key={i}>
          <motion.div
            className="h-4 bg-muted rounded"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </TableCell>
      ))}
    </TableRow>
  );

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col justify-center">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-center">
            On-Chain Portfolio Tracker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="flex gap-4 items-center justify-center"
          >
            <motion.div
              animate={
                isFocused
                  ? {
                      scale: 1.05,
                      boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)",
                    }
                  : { scale: 1, boxShadow: "none" }
              }
              transition={{ duration: 0.3 }}
              className="flex-grow max-w-md"
            >
              <Input
                type="text"
                placeholder="Enter EVM wallet address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full"
              />
            </motion.div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Track"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {(isLoading || tokenData.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle>Token Trading Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Token</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Price (USD)</TableHead>
                  <TableHead>P/L (7d)</TableHead>
                  <TableHead>P/L (30d)</TableHead>
                  <TableHead>P/L (1y)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <>
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                  </>
                ) : (
                  tokenData.map((token, index) => (
                    <TableRow key={index}>
                      <TableCell>{token.symbol}</TableCell>
                      <TableCell>{token.balance}</TableCell>
                      <TableCell>${token.price.toFixed(2)}</TableCell>
                      <TableCell
                        className={
                          token.profitLoss7d >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        ${token.profitLoss7d.toFixed(2)}
                      </TableCell>
                      <TableCell
                        className={
                          token.profitLoss30d >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        ${token.profitLoss30d.toFixed(2)}
                      </TableCell>
                      <TableCell
                        className={
                          token.profitLoss1y >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        ${token.profitLoss1y.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
