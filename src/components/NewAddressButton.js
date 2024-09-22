"use client";
import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React from "react";

export default function NewAddressButton() {
  return (
    <Button bg="black" color="white" width="232px" leftIcon={<AddIcon />}>
      Add new address
    </Button>
  );
}
