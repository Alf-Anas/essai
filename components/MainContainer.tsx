import { Box, Container } from "@radix-ui/themes";
import { ReactNode } from "react";

export default function MainContainer({ children }: { children: ReactNode }) {
    return (
        <Box className="flex-grow bg-gray-100 rounded-lg m-4">
            <Container px={{ initial: "4", md: "8" }} py="5">
                {children}
            </Container>
        </Box>
    );
}
