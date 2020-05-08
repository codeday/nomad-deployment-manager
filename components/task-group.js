import React, { useState } from 'react';
import Link from 'next/link'

import Box, { Grid, Flex } from '@codeday/topo/Atom/Box';
import Text from '@codeday/topo/Atom/Text'
import Button from '@codeday/topo/Atom/Button';
import { Text as TextInput } from '@codeday/topo/Atom/Input'

export default ({ name, defaultCount, onCountUpdate, tasks, jobId }) => {
  const [ count, setCount ] = useState(defaultCount);

  let taskItems = []

  tasks.forEach((task) => {
    const [ repoName, imageName ] = task.Config.image.split(':', 2)
    const taskName = task.Name
    taskItems.push([taskName,""])
    taskItems.push([repoName,""])
    taskItems.push([imageName,""])
    taskItems.push(["edit",`/jobs/${jobId}/${name}/${taskName}`])
  })

  return (
    <Box padding={4} marginY={4} borderWidth="1px" rounded="lg"  >
      <Text as="h2" fontSize="xl" fontWeight="semibold">{name}</Text>
      <Flex marginY={2} align="center">
        <TextInput.default marginRight={4} size="sm" inputMode="numeric" pattern="\d{1,2}" value={count} onChange={(e) => setCount(e.target.value)}/>
        <Button variant="solid" size="sm" variantColor="blue" type="submit" onClick={() => onCountUpdate(Number(count))}>Update Scale</Button>
      </Flex>
      <Text paddingTop={4} as="h2" fontSize="lg" fontWeight="thin">Tasks</Text>
      <Box>
        <Grid width="full" marginTop={6} templateColumns={["2fr 3fr 4fr 1fr"]} textAlign="center">
          <Text fontSize="md" fontWeight="semibold">Name</Text>
          <Text fontSize="md" fontWeight="semibold">Repo</Text>
          <Text fontSize="md" fontWeight="semibold">Image</Text>
          <Text fontSize="md" fontWeight="semibold"></Text>
        </Grid>
        {
          tasks.map((task) => {
            const [ repoName, imageName ] = task.Config.image.split(':', 2)
            const taskName = task.Name

            return (
              <Grid width="full" marginBottom={2} templateColumns={["2fr 3fr 4fr 1fr"]} textAlign="center">
                <Text as="span">{taskName}</Text>
                <Text as="span">{repoName}</Text>
                <Text as="span">{imageName}</Text>
                <Flex justify="center">
                  <Link href={`/jobs/${jobId}/${name}/${taskName}`}>
                    <Button as="a" size="xs" width="12">Edit</Button>
                  </Link>
                </Flex>
              </Grid>
            )
          })
        }
      </Box>
    </Box>
  )
}
