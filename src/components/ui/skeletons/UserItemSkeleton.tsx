import { FC } from "react"

import { Card, Skeleton, SkeletonCircle } from "@chakra-ui/react"

const UserItemSkeleton: FC = () => {
  return (
    <Card
      display={"flex"}
      gap={3}
      alignItems={"center"}
      flexDir={"row"}
      w={"full"}
      p={3}
    >
      <SkeletonCircle size={"45"} />
      <Skeleton h={"25px"} w={"85%"} />
    </Card>
  )
}

export default UserItemSkeleton
