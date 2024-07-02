"use client";

import { Box, Button, Flex, Grid, Heading, Link, Text } from "@radix-ui/themes";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TutorialPage() {
    const router = useRouter();

    return (
        <main>
            <Grid columns={{ initial: "1", md: "2" }} gap="4">
                <Box>
                    <Heading size="6" as="h2">
                        Tutorial
                    </Heading>

                    <Text as="p" className="my-4 text-justify">
                        To start using this app, please provide the required
                        files first. You will need two separate files: a{" "}
                        <strong>Question</strong> file and an{" "}
                        <strong>Answer</strong> file
                        <br />
                        You can download sample datasets from the following
                        links:
                        <br />
                        <Link
                            href="/sample_dataset/question.xlsx"
                            target="_blank"
                            color="indigo"
                        >
                            - Question File
                        </Link>
                        <br />
                        <Link
                            href="/sample_dataset/answer.xlsx"
                            target="_blank"
                            color="indigo"
                        >
                            - Answer File
                        </Link>
                    </Text>

                    <Text as="p" className="font-bold">
                        How It Works
                    </Text>
                    <ol className="list-decimal space-y-2">
                        <li>
                            Click the <strong>Start Scoring</strong> button or
                            open this{" "}
                            <Link href="/scoring" color="indigo">
                                Start Scoring
                            </Link>
                        </li>
                        <li>
                            On the Question Tab, click{" "}
                            <strong>Choose File</strong> to upload the questions
                            file.
                        </li>
                        <li>
                            Set the scoring criteria for the question section.
                        </li>
                        <li>
                            On the Answer Tab, click{" "}
                            <strong>Choose File</strong> to upload the answers
                            file.
                        </li>
                        <li>
                            Set the columns for the answers and question-answer
                            mappings.
                        </li>
                        <li>
                            Go to the <strong>Processing & Result</strong> tab.
                        </li>
                        <li>
                            Ensure the <strong>Question Settings</strong> and{" "}
                            <strong>Answer Settings</strong> are{" "}
                            <strong>OK</strong>
                        </li>
                        <li>
                            Click the <strong>Start Process</strong> button and
                            wait until the process is finished.
                        </li>
                        <li>
                            AI Evaluation: Let EssAI analyze and score each
                            essay.
                        </li>
                        <li>
                            Review Results: Access detailed scores and feedback.
                        </li>
                        <li>
                            Click <strong>Download</strong> button to download
                            the results.
                        </li>
                    </ol>

                    <Text as="p" className="my-4 text-justify">
                        Experience the future of essay scoring with EssAI. Join
                        our community of forward-thinking educators and
                        students, and take the first step towards a smarter,
                        more efficient grading process.
                    </Text>
                </Box>

                <Flex direction="column" gap="3" className="text-center">
                    <Image
                        alt="logo"
                        width="500"
                        height="500"
                        src="/img/logo.png"
                        className="max-w-96 max-h-96 mx-auto"
                    />
                    <Flex className="mx-auto" gap="4">
                        <Button
                            variant="solid"
                            size="3"
                            className="min-w-36"
                            onClick={() => router.push("/scoring")}
                        >
                            Start Scoring
                        </Button>
                    </Flex>
                </Flex>
            </Grid>
        </main>
    );
}
