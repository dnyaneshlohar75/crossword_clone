"use client";

import React from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Avatar,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { IoPersonSharp, IoBagOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import useCart from "@/providers/CartState";
import SearchBar from "./SearchBar";
import useWishlist from "@/providers/WishlistState";

const HeaderSection = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  
  const { data, status } = useSession();

  return (
    <Box
      maxW="100vw"
      minH="8vh"
      position="relative"
      color="black"
      bg="#FFE619"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
      mx="auto"
    >
      <Flex align="center" mr={4}>
        <Image src="/images/logo.png" alt="logo" boxSize="70px" mr={4} />
        <Link href="/">
          <Text fontSize="lg">CROSSWORD</Text>
        </Link>
      </Flex>

      <SearchBar />

      <Flex align="center">
        {status === "authenticated" ? (
          <Menu>
            <MenuButton>
              <Text>Hi!, {data?.user?.name}</Text>
            </MenuButton>
            <MenuList>
              <MenuItem fontSize="small">
                <Link href={data?.user?.role === "User" ? "/user/dashboard" : "/admin"}>
                  MY ACCOUNT
                </Link>
              </MenuItem>
              <MenuItem
                fontSize="small"
                onClick={() =>
                  signOut({
                    redirect: "/login",
                  })
                }
              >LOGOUT</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Link href="/login">
            <IoPersonSharp size={24} />
          </Link>
        )}

<Link
          href="/wishlist"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            position:"relative"
          }}
        >
          <FaHeart size={24} style={{ marginLeft: 20 }} />
          <Badge bg="black" color="white" borderRadius="100%" style= {{
            position: "absolute",
            right: "-5px",
            top: "-3px"
          }}>{wishlist?.length || 0}</Badge>
        </Link>

        <Link
          href="/mybag"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            position:"relative"
          }}
        >
          <IoBagOutline size={24} style={{ marginLeft: 20 }} />
          <Badge bg="black" color="white" borderRadius="100%" style= {{
            position: "absolute",
            right: "-5px",
            top: "-3px"
          }}>{cart?.length || 0}</Badge>
        </Link>
      </Flex>
    </Box>
  );
};

export default HeaderSection;
