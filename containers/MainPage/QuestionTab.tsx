import { ObjectLiteral } from "@/types/object-literal.interface";
import {
    Card,
    DataList,
    Flex,
    Heading,
    Link,
    Select,
    Separator,
} from "@radix-ui/themes";
import ChooseExcelFile from "@/components/ChooseExcelFile";

export type QuestionSettingType = {
    id: string;
    question: string;
    min_score: string;
    max_score: string;
    condition_set: string | undefined;
    example_max_score_answer: string | undefined;
};

export const QuestionSettingInitial: QuestionSettingType = {
    id: "id",
    question: "question",
    min_score: "min_score",
    max_score: "max_score",
    condition_set: "",
    example_max_score_answer: "",
};

type Props = {
    onChangeXlsJson: (xlsJson: ObjectLiteral[]) => void;
    onChangeHeaderArr: (headerArr: string[]) => void;
    onChangeSetting: React.Dispatch<React.SetStateAction<QuestionSettingType>>;
    setting: QuestionSettingType;
    headerArr: string[];
};

export default function QuestionTab({
    onChangeHeaderArr,
    onChangeSetting,
    onChangeXlsJson,
    setting,
    headerArr,
}: Props) {
    return (
        <section>
            <Card className="mb-4">
                <Flex className="justify-between items-center">
                    <Heading as="h4" size="3">
                        Question Setting
                    </Heading>
                    <Link
                        href="/sample_dataset/question.xlsx"
                        target="_blank"
                        size="1"
                        color="indigo"
                    >
                        Download Sample Data
                    </Link>
                </Flex>
                <Separator my="3" size="4" />
                <DataList.Root>
                    <DataList.Item align="center">
                        <DataList.Label minWidth="88px">ID</DataList.Label>
                        <DataList.Value>
                            <Select.Root
                                size="2"
                                value={setting.id}
                                onValueChange={(val) =>
                                    onChangeSetting((oldState) => ({
                                        ...oldState,
                                        id: val,
                                    }))
                                }
                            >
                                <Select.Trigger placeholder="Choose Column Name" />
                                <Select.Content>
                                    {headerArr.map((item, idx) => (
                                        <Select.Item key={idx} value={item}>
                                            {item}
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Root>
                        </DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.Label minWidth="88px">
                            Question
                        </DataList.Label>
                        <DataList.Value>
                            <Select.Root
                                size="2"
                                value={setting.question}
                                onValueChange={(val) =>
                                    onChangeSetting((oldState) => ({
                                        ...oldState,
                                        question: val,
                                    }))
                                }
                            >
                                <Select.Trigger placeholder="Choose Column Name" />
                                <Select.Content>
                                    {headerArr.map((item, idx) => (
                                        <Select.Item key={idx} value={item}>
                                            {item}
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Root>
                        </DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.Label minWidth="88px">
                            Minimum Score
                        </DataList.Label>
                        <DataList.Value>
                            <Select.Root
                                size="2"
                                value={setting.min_score}
                                onValueChange={(val) =>
                                    onChangeSetting((oldState) => ({
                                        ...oldState,
                                        min_score: val,
                                    }))
                                }
                            >
                                <Select.Trigger placeholder="Choose Column Name" />
                                <Select.Content>
                                    {headerArr.map((item, idx) => (
                                        <Select.Item key={idx} value={item}>
                                            {item}
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Root>
                        </DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.Label minWidth="88px">
                            Maximum Score
                        </DataList.Label>
                        <DataList.Value>
                            <Select.Root
                                size="2"
                                value={setting.max_score}
                                onValueChange={(val) =>
                                    onChangeSetting((oldState) => ({
                                        ...oldState,
                                        max_score: val,
                                    }))
                                }
                            >
                                <Select.Trigger placeholder="Choose Column Name" />
                                <Select.Content>
                                    {headerArr.map((item, idx) => (
                                        <Select.Item key={idx} value={item}>
                                            {item}
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Root>
                        </DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.Label minWidth="88px">
                            Condition Set / Rules (optional)
                        </DataList.Label>
                        <DataList.Value>
                            <Select.Root
                                size="2"
                                value={setting.condition_set}
                                onValueChange={(val) =>
                                    onChangeSetting((oldState) => ({
                                        ...oldState,
                                        condition_set: val,
                                    }))
                                }
                            >
                                <Select.Trigger placeholder="Choose Column Name" />
                                <Select.Content>
                                    <Select.Item value="-">
                                        --- Not Set ---
                                    </Select.Item>
                                    {headerArr.map((item, idx) => (
                                        <Select.Item key={idx} value={item}>
                                            {item}
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Root>
                        </DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.Label minWidth="88px">
                            Example Answer for Maximum Score (optional)
                        </DataList.Label>
                        <DataList.Value>
                            <Select.Root
                                size="2"
                                value={setting.example_max_score_answer}
                                onValueChange={(val) =>
                                    onChangeSetting((oldState) => ({
                                        ...oldState,
                                        example_max_score_answer: val,
                                    }))
                                }
                            >
                                <Select.Trigger placeholder="Choose Column Name" />
                                <Select.Content>
                                    <Select.Item value="-">
                                        --- Not Set ---
                                    </Select.Item>
                                    {headerArr.map((item, idx) => (
                                        <Select.Item key={idx} value={item}>
                                            {item}
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Root>
                        </DataList.Value>
                    </DataList.Item>
                </DataList.Root>
            </Card>

            <ChooseExcelFile
                onChange={(jsonData, headerArray) => {
                    onChangeXlsJson(jsonData);
                    onChangeHeaderArr(headerArray);
                }}
            />
        </section>
    );
}
