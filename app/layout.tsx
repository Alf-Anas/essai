import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "@/styles/radix.config.css";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainContainer from "@/components/MainContainer";

export const metadata: Metadata = {
    title: "EssAI : Essay Auto Scoring by AI",
    description: "Essay Auto Scoring by AI",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta name="dicoding:email" content="alfadila.anas@gmail.com" />
            </head>

            <body>
                <Theme
                    accentColor="grass"
                    grayColor="gray"
                    panelBackground="solid"
                    scaling="100%"
                    appearance="light"
                >
                    <div className="flex flex-col min-h-screen bg-gray-300">
                        <Header />
                        <MainContainer>{children}</MainContainer>
                        <Footer />
                    </div>
                </Theme>
            </body>
        </html>
    );
}
