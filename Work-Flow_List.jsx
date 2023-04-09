import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Table, Thead, Tr, Th, Tbody, Td, Heading, Link } from '@chakra-ui/react';

export default function WorkFlowList() {
    const [workflowlist, setworkflowlist] = useState(null);

    useEffect(() => {
        axios
            .get('https://64307b10d4518cfb0e50e555.mockapi.io/workflow')
            .then((response) => {
                const workflows = response.data.map((workflow) => ({
                    ...workflow,
                    createdAt: new Date(workflow.createdAt).toISOString().split('T')[0]
                }));
                setworkflowlist(workflows);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <Box>
            <Box
                borderBottom={'1px solid gray'}
                mb={'4'}
                width={'100%'}
                position={'fixed'}
                top={'0'}
                left={'0'}
                bg={'white'}
            >
                <Heading as={'h3'} fontWeight='700' fontSize='1.2rem' p="10px">
                    WorkFlows
                </Heading>
            </Box>
            {workflowlist !== null ? (
                <Table
                    variant="simple"
                    width="70%"
                    ml={'4rem'}
                    mt={'4rem'}
                    mb={'2rem'}
                >
                    <Thead>
                        <Tr>
                            <Th bg="#4472c4" color="white" borderRight={'2px solid'}>
                                Name
                            </Th>
                            <Th bg="#4472c4" color="white" borderRight={'2px solid'}>
                                Input type
                            </Th>
                            <Th bg="#4472c4" color="white" borderRight={'2px solid'}>
                                Created at
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {workflowlist.map((workflow, index) => (
                            <Tr
                                key={workflow.id}
                                bg={index % 2 === 0 ? '#cfd5ea' : '#e9ebf5'}
                            >
                                <Td border="none" borderRight={'2px solid white'}>
                                    <Link borderBottom={'1px solid black'}>{workflow.name}</Link>
                                </Td>
                                <Td border="none" borderRight={'2px solid white'}>
                                    {workflow.input_type}
                                </Td>
                                <Td border="none" borderRight={'2px solid white'}>
                                    {workflow.createdAt}
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            ) : (
                <h1>Loading data ...</h1>
            )}
        </Box>
    );
}