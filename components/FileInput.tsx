import { Button } from "@radix-ui/themes";
import React, { ReactNode, useRef } from "react";

type Props = {
    label: ReactNode;
    accept: string;
    onChange: (file: File) => void;
    className?: string;
    size?: "1" | "2" | "3" | "4";
};

export default function FileInput({
    label = "Choose File",
    accept,
    onChange,
    size,
    className,
}: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event?.target?.files === null) return;
        const file = event?.target?.files[0];
        if (file) {
            onChange(file);
        }
    };

    return (
        <div className="flex items-center space-x-2">
            <Button
                onClick={handleButtonClick}
                size={size}
                className={className}
            >
                {label}
            </Button>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept={accept}
            />
        </div>
    );
}
