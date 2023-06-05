import getMessage from "../common/LanguageVersionMessageFinder";
import {useState} from "react";

export default function SearchBar({languageVersion, searchParams, setSearchParams}) {

    const [line, resetLine] = useInput("");
    const submit = event => {
        event.preventDefault();
        updateSearchParams(line.value, searchParams, setSearchParams);
    };

    return <form>
        <div className="flex p-5 sm:ml-72">
            <div className="relative w-8/12 flex-end">
                <input
                    {...line}
                    type="search" id="search-dropdown"
                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-l-2 border border-gray-300 focus:ring-violet-500 focus:border-violet-500"
                    placeholder={getMessage(languageVersion, "searchMockUp", MESSAGES)}>
                </input>
                <button type="button" onClick={submit}
                        className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-violet-700 rounded-r-lg border border-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300">
                    <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor"
                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <span className="sr-only">Search</span>
                </button>
            </div>
        </div>
    </form>
}

const useInput = initialValue => {
    const [value, setValue] = useState(initialValue);
    return [
        {value, onChange: e => setValue(e.target.value)},
        () => setValue(initialValue)
    ];
};

function updateSearchParams(line, searchParams, setSearchParams) {
    setSearchParams({
        category: searchParams.category,
        params: line.split(" ")
    })
}

const MESSAGES = [
    {
        "name": "searchMockUp",
        "values": [
            {
                "language": "english",
                "value": "Search name, color, description..."
            },
            {
                "language": "polish",
                "value": "Szukaj po nazwie, kolorze, opisie..."
            }
        ]
    }
]