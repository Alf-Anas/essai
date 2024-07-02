"use client";

import { Avatar, Button, Flex, Heading } from "@radix-ui/themes";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <header className="flex items-center px-4 border-b bg-emerald-500 text-gray-800">
            <Avatar src="./img/logo.png" fallback="EssAI" className="mr-2" />
            <Heading as="h1" className="flex-grow my-4">
                EssAI
            </Heading>
            <Flex gap="1">
                <Button
                    variant="solid"
                    disabled={pathname === "/"}
                    onClick={() => router.push("/")}
                >
                    Home
                </Button>
                <Button
                    variant="solid"
                    disabled={pathname === "/scoring"}
                    onClick={() => router.push("/scoring")}
                >
                    Scoring
                </Button>
                <Button
                    variant="solid"
                    disabled={pathname === "/tutorial"}
                    onClick={() => router.push("/tutorial")}
                >
                    Tutorial
                </Button>
            </Flex>
        </header>
    );
}
