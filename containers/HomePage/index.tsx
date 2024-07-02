"use client";

import { Box, Button, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter();

    return (
        <main>
            <Grid columns={{ initial: "1", md: "2" }} gap="4">
                <Box>
                    <Heading size="6" as="h2">
                        Welcome to EssAI : Essay Auto Scoring by AI
                    </Heading>

                    <Text as="p" className="my-4 text-justify">
                        Revolutionize the way you evaluate essays with EssAI, an
                        innovative tool designed to streamline and enhance the
                        grading process through the power of artificial
                        intelligence. Whether you`re an educator looking to save
                        time or a student seeking constructive feedback, EssAI
                        offers a seamless solution for all your essay scoring
                        needs.
                    </Text>

                    <Text as="p" className="font-bold">
                        Key Features:
                    </Text>

                    <ul className="list-disc space-y-2">
                        <li>
                            Automated Scoring: Quickly and accurately assess
                            essays using advanced AI algorithms.
                        </li>
                        <li>
                            Customizable Rules: Define specific scoring criteria
                            and rules.
                        </li>
                        <li>
                            Detailed Feedback: Receive comprehensive feedback on
                            each essay.
                        </li>
                        <li>
                            Efficient Workflow: Save time with our user-friendly
                            interface.
                        </li>
                        <li>
                            Data Security: Secure handling and storage of all
                            data.
                        </li>
                    </ul>

                    <Text as="p" className="font-bold">
                        Why Choose EssAI?
                    </Text>
                    <ul className="list-disc space-y-2">
                        <li>
                            Accuracy: Reliable and precise scoring using AI
                            technology.
                        </li>
                        <li>
                            Customization: Tailor the scoring process to your
                            needs.
                        </li>
                        <li>Time-Saving: Reduce time spent on grading.</li>
                        <li>
                            Scalability: Efficiently handle large volumes of
                            essays.
                        </li>
                    </ul>

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
                        <Button
                            variant="outline"
                            size="3"
                            className="min-w-36"
                            onClick={() => router.push("/tutorial")}
                        >
                            Tutorial
                        </Button>
                    </Flex>
                </Flex>
            </Grid>
        </main>
    );
}
