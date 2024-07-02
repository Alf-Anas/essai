import FileInput from "@/components/FileInput";

import XLSX from "xlsx";
import { useState } from "react";
import { ObjectLiteral } from "@/types/object-literal.interface";
import { Table } from "@radix-ui/themes";
import { swalError } from "@/utils";

type Props = {
    onChange: (
        jsonData: ObjectLiteral[],
        headerArr: string[],
        sheetName: string,
        workbook: XLSX.WorkBook
    ) => void;
};

export default function ChooseExcelFile({ onChange }: Props) {
    const [xlsJson, setXlsJson] = useState<ObjectLiteral[]>([]);
    const [headerArr, setHeaderArr] = useState<string[]>([]);

    async function onChangeFile(file: File) {
        try {
            const dataBuffer = await file.arrayBuffer();
            const workbook = XLSX.read(dataBuffer);
            const theSheetName = workbook.SheetNames[0];
            if (theSheetName) {
                const theSheet = workbook.Sheets[theSheetName];
                const jsonOut = XLSX.utils.sheet_to_json(
                    theSheet
                ) as ObjectLiteral[];
                setXlsJson(jsonOut as ObjectLiteral[]);
                if (jsonOut?.length > 0) {
                    const listHeader = Object.keys(jsonOut[0]);
                    setHeaderArr(listHeader);

                    onChange(jsonOut, listHeader, theSheetName, workbook);
                } else {
                    throw new Error("Data Not Found!");
                }
            }
        } catch (err) {
            console.error(err);
            swalError(err);
        }
    }

    return (
        <section>
            <FileInput
                label="Choose File"
                accept=".xlsx; .xls; .csv"
                onChange={(file) => onChangeFile(file)}
                size="2"
                className="mb-4"
            />

            {xlsJson.length > 0 && (
                <Table.Root variant="surface" size="1">
                    <Table.Header>
                        <Table.Row>
                            {headerArr.map((item, idx) => (
                                <Table.ColumnHeaderCell key={idx}>
                                    {item}
                                </Table.ColumnHeaderCell>
                            ))}
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {xlsJson.map((item, idx) => {
                            return (
                                <Table.Row key={idx}>
                                    {headerArr.map((key, idy) => (
                                        <Table.Cell key={idy}>
                                            {item[key]}
                                        </Table.Cell>
                                    ))}
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table.Root>
            )}
        </section>
    );
}
