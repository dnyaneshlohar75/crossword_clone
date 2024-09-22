import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "@/components/LogoutButton";
import NewAddressButton from "@/components/NewAddressButton";
import { Box, Container, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "User") {
    redirect("/");
  }

  if (session?.user?.role === "Admin") {
    redirect("/admin");
  }

  return (
    <Container p={0} maxW="100%" m={0}>
      <Box>
        <h1>I am side bar</h1>
      </Box>
      <Box>
        <Flex
          alignItems="center"
          justifyContent="center"
          gap="12"
          p="8"
          w="100%"
        >
          <Box>
            <Text color="GrayText" fontSize="medium">
              Name:
            </Text>
            <Text fontSize="16" fontWeight="500">
              {session?.user?.name}
            </Text>
          </Box>
          <Box>
            <Text color="GrayText" fontSize="medium">
              Email id:
            </Text>
            <Text fontSize="16" fontWeight="500">
              {session?.user?.email}
            </Text>
          </Box>
          <Box>
            <Text color="GrayText" fontSize="medium">
              Mobile:
            </Text>
            <Text fontSize="16" fontWeight="500">
              {session?.user?.mobile_number || 0}
            </Text>
          </Box>
        </Flex>
        <Divider orientation="horizontal" color="gray" />
        <Flex
          alignItems="center"
          justifyContent="center"
          gap="12"
          p="8"
          w="100%"
        >
          <NewAddressButton />
        </Flex>
      </Box>
    </Container>
  );
}
