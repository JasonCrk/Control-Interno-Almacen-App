import { FC, KeyboardEvent } from "react"

import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"

import { FiSearch } from "react-icons/fi"

interface Props {
  changeSearchQuery: (searchQuery: string) => void
}

const SearchBar: FC<Props> = ({ changeSearchQuery }) => {
  const handleSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      changeSearchQuery(event.currentTarget.value)
    }
  }

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      py={3}
      bg={"gray.500"}
    >
      <InputGroup width={"70%"}>
        <InputLeftElement pointerEvents={"none"}>
          <FiSearch />
        </InputLeftElement>
        <Input placeholder="Buscar..." bg={"white"} onKeyDown={handleSearch} />
      </InputGroup>
    </Flex>
  )
}

export default SearchBar
