import getMessage from "./LanguageVersionMessageFinder";

export default function getProblemsIfReported(order, languageVersion, possibleOrderProblems) {
    if (order.reportedProblems.length === 0) {
        return;
    }
    return order.reportedProblems.map(problem => getProblem(problem, languageVersion, possibleOrderProblems));
}

function getProblem(problem, languageVersion, possibleOrderProblems) {
    return <>
        {wrapInBasicDiv(getProblemType(problem, languageVersion, possibleOrderProblems))}
        {wrapInBasicDiv(getProblemDescription(problem, languageVersion))}
    </>
}

function wrapInBasicDiv(content) {
    return <div className="border-2 border-violet-100">
        {content}
    </div>
}

function getProblemType(problem, languageVersion, possibleOrderProblems) {
    if(problem.description !== undefined && problem.description !== null) {
        return <>
            {getMessage(languageVersion, "problemType", LABELS)}
            {problem.type.map(problemType => getMessage(languageVersion, problemType, possibleOrderProblems)).join(', ')}
        </>
    }
}
function getProblemDescription(problem, languageVersion) {
    if(problem.type !== undefined && problem.type !== null) {
        return <>
            {getMessage(languageVersion, "problemDescription", LABELS)}
            {problem.description}
        </>
    }
}

const LABELS = [
    {
        "name" : "problemType",
        "values": [
            {
                "language" : "english",
                "value": "Problem type: "
            },
            {
                "language" : "polish",
                "value": "Typ problemu: "
            }
        ]
    },
    {
        "name" : "problemDescription",
        "values": [
            {
                "language" : "english",
                "value": "Problem description: "
            },
            {
                "language" : "polish",
                "value": "Opis problemu: "
            }
        ]
    }
]