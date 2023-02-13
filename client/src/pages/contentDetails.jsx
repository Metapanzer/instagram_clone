import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  Button,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike, BiChat } from "react-icons/bi";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ContentDetails() {
  const [contents, setContents] = useState([]);
  const location = useLocation();

  const getContentDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/contents/media/all"
      );
      setContents(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContentDetails();
  }, []);

  return (
    <div>
      {contents.map((content, index) => {
        return (
          <>
            <Card key={index} maxW="md" className="mb-8">
              <CardHeader>
                <Flex spacing="4">
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Avatar name={content.username} src="/images/default.png" />

                    <Box>
                      <Heading size="sm">{content.username}</Heading>
                    </Box>
                  </Flex>
                  <IconButton
                    variant="ghost"
                    colorScheme="gray"
                    aria-label="See menu"
                    icon={<BsThreeDotsVertical />}
                  />
                </Flex>
              </CardHeader>
              <Image
                objectFit="cover"
                src={`http://localhost:5000/${content.media}`}
                alt="Chakra UI"
              />
              <CardBody>
                <Text className="font-bold">
                  {content.username}
                  <span className="font-normal ml-3">{content.caption}</span>
                </Text>
                <Text className="text-sm text-slate-400">
                  {content.createdAt.slice(0, 10)}
                </Text>
              </CardBody>

              <CardFooter
                justify="space-between"
                flexWrap="wrap"
                sx={{
                  "& > button": {
                    minW: "136px",
                  },
                }}
              >
                <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
                  Like ({content.like})
                </Button>
                <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
                  Comment
                </Button>
              </CardFooter>
            </Card>
          </>
        );
      })}
    </div>
  );
}
