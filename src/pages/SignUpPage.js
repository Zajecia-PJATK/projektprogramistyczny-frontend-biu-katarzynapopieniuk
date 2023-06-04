import SignupForm from "../components/SignupForm";

export default function SignUpPage({languageVersion, accounts, setAccounts}) {
    return <div className="p-4 sm:ml-64"><SignupForm languageVersion={languageVersion} accounts={accounts} setAccounts={setAccounts}/></div>
}