import SignupForm from "../components/SignupForm";

export default function SignUpPage({languageVersion, accounts, setAccounts}) {
    return <div><SignupForm languageVersion={languageVersion} accounts={accounts} setAccounts={setAccounts}/></div>
}