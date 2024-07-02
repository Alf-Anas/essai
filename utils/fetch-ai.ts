type FetchAIType = {
    question: string;
    answer: string;
    min_score: string;
    max_score: string;
    condition_set?: string;
    example_max_score_answer?: string;
};

export async function fetchAI(rawData: FetchAIType) {
    const response = await fetch("/api/scoring", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(rawData),
    });

    if (response.status === 200) {
        const resData = await response.json();
        return {
            ok: true,
            message: "success",
            data: JSON.parse(resData?.data) as {
                score: number;
                comment: string;
            },
        };
    } else {
        return { ok: false, message: JSON.stringify(response.json()) };
    }
}
