import XLSX from "xlsx";
import { useState } from "react";
import { ObjectLiteral } from "@/types/object-literal.interface";
import {
    Badge,
    Button,
    Card,
    DataList,
    Flex,
    Heading,
    Separator,
    Table,
    Text,
} from "@radix-ui/themes";
import { QuestionSettingType } from "./QuestionTab";
import { AnswerSettingType } from "./AnswerTab";

import { fetchAI } from "@/utils/fetch-ai";
import { delay, errorResponse } from "@/utils";

type ResultType = {
    no: number;
    id: string;
    name: string;
    [key: string]: any;
};

type Props = {
    headerArrQuestion: string[];
    headerArrAnswer: string[];
    questionSetting: QuestionSettingType;
    answerSetting: AnswerSettingType;
    answerQuestionSetting: ObjectLiteral;
    xlsJsonQuestion: ObjectLiteral[];
    xlsJsonAnswer: ObjectLiteral[];
};

export default function ResultTab({
    answerQuestionSetting,
    answerSetting,
    headerArrAnswer,
    headerArrQuestion,
    questionSetting,
    xlsJsonAnswer,
    xlsJsonQuestion,
}: Props) {
    const [results, setResults] = useState<ResultType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState("");
    const resultKeys = results.length > 0 ? Object.keys(results[0]) : [];

    const isQuestionSettingOK = (() => {
        if (
            questionSetting.id &&
            questionSetting.question &&
            questionSetting.min_score &&
            questionSetting.max_score
        ) {
            if (
                headerArrQuestion.includes(questionSetting.id) &&
                headerArrQuestion.includes(questionSetting.question) &&
                headerArrQuestion.includes(questionSetting.min_score) &&
                headerArrQuestion.includes(questionSetting.max_score)
            ) {
                return true;
            }
        }
        return false;
    })();

    const isAnswerSettingOK = (() => {
        if (answerSetting.id && answerSetting.name) {
            if (
                headerArrAnswer.includes(answerSetting.id) &&
                headerArrAnswer.includes(answerSetting.name)
            ) {
                const keysAnswerQuestion = Object.keys(answerQuestionSetting);
                if (keysAnswerQuestion.length > 0) {
                    for (let i = 0; i < keysAnswerQuestion.length; i++) {
                        const iKey = keysAnswerQuestion[i];
                        const iVal = answerQuestionSetting[iKey];
                        if (iVal && headerArrAnswer.includes(iVal)) {
                            continue;
                        } else {
                            return false;
                        }
                    }
                    return true;
                }
            }
        }
        return false;
    })();

    function getQuestionFromJson(qID: string) {
        const qData = xlsJsonQuestion.find((item) => item.id === qID);
        return qData;
    }

    async function onClickStart() {
        setIsLoading(true);
        setResults([]);
        const listQuestionID = Object.keys(answerQuestionSetting);
        setProgress(`0/${xlsJsonAnswer.length} (0/${listQuestionID.length})`);

        const listUserResult: ResultType[] = [];
        for (let i = 0; i < xlsJsonAnswer.length; i++) {
            const iAnswer = xlsJsonAnswer[i];
            const userResult: ResultType = {
                no: i + 1,
                id: iAnswer[answerSetting.id],
                name: iAnswer[answerSetting.name],
            };
            let userTotalScore = 0;
            for (let j = 0; j < listQuestionID.length; j++) {
                const qID = listQuestionID[j];
                const qData = getQuestionFromJson(qID);
                if (qData) {
                    try {
                        const theOutput = await fetchAI({
                            question: qData[questionSetting.question],
                            answer: iAnswer[answerQuestionSetting[qID]],
                            min_score: qData[questionSetting.min_score],
                            max_score: qData[questionSetting.max_score],
                            condition_set: questionSetting.condition_set
                                ? qData[questionSetting.condition_set]
                                : undefined,
                            example_max_score_answer:
                                questionSetting.example_max_score_answer
                                    ? qData[
                                          questionSetting
                                              .example_max_score_answer
                                      ]
                                    : undefined,
                        });
                        if (theOutput.ok) {
                            userTotalScore += theOutput.data?.score || 0;
                            userResult[`${qID}_score`] = theOutput.data?.score;
                            userResult[`${qID}_comment`] =
                                theOutput.data?.comment;
                        } else {
                            throw new Error(theOutput.message);
                        }
                    } catch (err) {
                        console.error(err);
                        userResult.error = errorResponse(err);
                    } finally {
                        setProgress(
                            `${i + 1}/${xlsJsonAnswer.length} (${j + 1}/${
                                listQuestionID.length
                            })`
                        );
                        await delay(1000);
                    }
                }
            }
            userResult.total = userTotalScore;
            listUserResult.push(userResult);
            setResults(listUserResult);
            await delay(2500);
        }
        setResults(listUserResult);
        setIsLoading(false);
        setProgress("");
    }

    function onClickDownload() {
        const worksheet = XLSX.utils.json_to_sheet(results);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Results");

        XLSX.writeFile(workbook, `EssAI_${new Date().toISOString()}.xlsx`, {
            compression: true,
        });
    }

    return (
        <section>
            <Card className="mb-4">
                <Heading as="h4" size="3">
                    Processing & Result
                </Heading>
                <Separator my="3" size="4" />
                <DataList.Root>
                    <DataList.Item align="center">
                        <DataList.Label minWidth="88px">
                            Question Setting
                        </DataList.Label>
                        <DataList.Value>
                            {isQuestionSettingOK ? (
                                <Badge
                                    color="jade"
                                    variant="soft"
                                    radius="full"
                                >
                                    OK
                                </Badge>
                            ) : (
                                <Badge
                                    color="tomato"
                                    variant="soft"
                                    radius="full"
                                >
                                    Error
                                </Badge>
                            )}
                        </DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.Label minWidth="88px">
                            Answer Setting
                        </DataList.Label>
                        <DataList.Value>
                            {isAnswerSettingOK ? (
                                <Badge
                                    color="jade"
                                    variant="soft"
                                    radius="full"
                                >
                                    OK
                                </Badge>
                            ) : (
                                <Badge
                                    color="tomato"
                                    variant="soft"
                                    radius="full"
                                >
                                    Error
                                </Badge>
                            )}
                        </DataList.Value>
                    </DataList.Item>
                </DataList.Root>
                <Separator my="3" size="4" />
                <Flex className="items-center justify-between" gap="4">
                    <Button
                        color="ruby"
                        onClick={onClickStart}
                        disabled={
                            !isAnswerSettingOK ||
                            !isQuestionSettingOK ||
                            isLoading
                        }
                        loading={isLoading}
                    >
                        Start Process
                    </Button>
                    <Text as="p" size="2" color="ruby" weight="bold">
                        {progress}
                    </Text>
                    {results.length > 0 && !isLoading && (
                        <Button onClick={onClickDownload}>Download</Button>
                    )}
                </Flex>
            </Card>

            {results.length > 0 && (
                <Table.Root variant="surface" size="1">
                    <Table.Header>
                        <Table.Row>
                            {resultKeys.map((item, idx) => (
                                <Table.ColumnHeaderCell key={idx}>
                                    {item}
                                </Table.ColumnHeaderCell>
                            ))}
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {results.map((item, idx) => {
                            return (
                                <Table.Row key={idx}>
                                    {resultKeys.map((key, idy) => (
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
