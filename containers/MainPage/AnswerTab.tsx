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

export type AnswerSettingType = {
    id: string;
    name: string;
};

export const AnswerSettingInitial: AnswerSettingType = {
    id: "id",
    name: "name",
};

type Props = {
    onChangeXlsJson: (xlsJson: ObjectLiteral[]) => void;
    onChangeHeaderArr: (headerArr: string[]) => void;
    onChangeSetting: React.Dispatch<React.SetStateAction<AnswerSettingType>>;
    setting: AnswerSettingType;
    headerArr: string[];
    questionID: string[];
    questionSetting: ObjectLiteral;
    onChangeQuestionSetting: React.Dispatch<
        React.SetStateAction<ObjectLiteral>
    >;
};

export default function AnswerTab({
    onChangeHeaderArr,
    onChangeSetting,
    onChangeXlsJson,
    setting,
    headerArr,
    questionID,
    questionSetting,
    onChangeQuestionSetting,
}: Props) {
    return (
        <section>
            <Card className="mb-4">
                <Flex className="justify-between items-center">
                    <Heading as="h4" size="3">
                        Answer Setting
                    </Heading>
                    <Link
                        href="/sample_dataset/answer.xlsx"
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
                        <DataList.Label minWidth="88px">Name</DataList.Label>
                        <DataList.Value>
                            <Select.Root
                                size="2"
                                value={setting.name}
                                onValueChange={(val) =>
                                    onChangeSetting((oldState) => ({
                                        ...oldState,
                                        name: val,
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

                    {questionID.map((quest, idx) => {
                        return (
                            <DataList.Item key={idx}>
                                <DataList.Label minWidth="88px">
                                    {quest}
                                </DataList.Label>
                                <DataList.Value>
                                    <Select.Root
                                        size="2"
                                        value={questionSetting[quest]}
                                        onValueChange={(val) =>
                                            onChangeQuestionSetting(
                                                (oldState) => ({
                                                    ...oldState,
                                                    [quest]: val,
                                                })
                                            )
                                        }
                                    >
                                        <Select.Trigger placeholder="Choose Column Name" />
                                        <Select.Content>
                                            {headerArr.map((item, idx) => (
                                                <Select.Item
                                                    key={idx}
                                                    value={item}
                                                >
                                                    {item}
                                                </Select.Item>
                                            ))}
                                        </Select.Content>
                                    </Select.Root>
                                </DataList.Value>
                            </DataList.Item>
                        );
                    })}
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
