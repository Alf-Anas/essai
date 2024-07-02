"use client";

import { Box, Heading, Tabs } from "@radix-ui/themes";
import QuestionTab, {
    QuestionSettingInitial,
    QuestionSettingType,
} from "./QuestionTab";
import AnswerTab, {
    AnswerSettingInitial,
    AnswerSettingType,
} from "./AnswerTab";
import ResultTab from "./ResultTab";
import { useEffect, useState } from "react";
import { ObjectLiteral } from "@/types/object-literal.interface";

export default function MainPage() {
    const [xlsJsonQuestion, setXlsJsonQuestion] = useState<ObjectLiteral[]>([]);
    const [headerArrQuestion, setHeaderArrQuestion] = useState<string[]>([]);
    const [questionSetting, setQuestionSetting] = useState<QuestionSettingType>(
        QuestionSettingInitial
    );
    const [questionID, setQuestionID] = useState<string[]>([]);

    const [xlsJsonAnswer, setXlsJsonAnswer] = useState<ObjectLiteral[]>([]);
    const [headerArrAnswer, setHeaderArrAnswer] = useState<string[]>([]);
    const [answerSetting, setAnswerSetting] =
        useState<AnswerSettingType>(AnswerSettingInitial);
    const [answerQuestionSetting, setAnswerQuestionSetting] =
        useState<ObjectLiteral>({});

    useEffect(() => {
        if (questionSetting.id && xlsJsonQuestion.length > 0) {
            const listID: string[] = [];
            const eAnswerQuestingSetting: ObjectLiteral = {};
            xlsJsonQuestion.forEach((item) => {
                const idItem = item[questionSetting.id];
                if (idItem) {
                    listID.push(idItem);
                    eAnswerQuestingSetting[idItem] = idItem;
                }
            });
            setQuestionID(listID);
            setAnswerQuestionSetting(eAnswerQuestingSetting);
        }
    }, [questionSetting.id, xlsJsonQuestion]);

    return (
        <main className="overflow-x-auto">
            <Heading size="6" as="h2" className="mb-8">
                Start Scoring Process
            </Heading>
            <Tabs.Root defaultValue="question">
                <Tabs.List size="2">
                    <Tabs.Trigger value="question">1. Question</Tabs.Trigger>
                    <Tabs.Trigger value="answer">2. Answer</Tabs.Trigger>
                    <Tabs.Trigger value="result">
                        3. Processing & Result
                    </Tabs.Trigger>
                </Tabs.List>

                <Box pt="3">
                    <Tabs.Content
                        forceMount
                        value="question"
                        className="data-[state=inactive]:hidden"
                    >
                        <QuestionTab
                            headerArr={headerArrQuestion}
                            onChangeHeaderArr={setHeaderArrQuestion}
                            setting={questionSetting}
                            onChangeSetting={setQuestionSetting}
                            onChangeXlsJson={setXlsJsonQuestion}
                        />
                    </Tabs.Content>

                    <Tabs.Content
                        forceMount
                        value="answer"
                        className="data-[state=inactive]:hidden"
                    >
                        <AnswerTab
                            headerArr={headerArrAnswer}
                            onChangeHeaderArr={setHeaderArrAnswer}
                            setting={answerSetting}
                            onChangeSetting={setAnswerSetting}
                            onChangeXlsJson={setXlsJsonAnswer}
                            questionID={questionID}
                            questionSetting={answerQuestionSetting}
                            onChangeQuestionSetting={setAnswerQuestionSetting}
                        />
                    </Tabs.Content>

                    <Tabs.Content
                        forceMount
                        value="result"
                        className="data-[state=inactive]:hidden"
                    >
                        <ResultTab
                            answerQuestionSetting={answerQuestionSetting}
                            answerSetting={answerSetting}
                            headerArrAnswer={headerArrAnswer}
                            headerArrQuestion={headerArrQuestion}
                            questionSetting={questionSetting}
                            xlsJsonAnswer={xlsJsonAnswer}
                            xlsJsonQuestion={xlsJsonQuestion}
                        />
                    </Tabs.Content>
                </Box>
            </Tabs.Root>
        </main>
    );
}
