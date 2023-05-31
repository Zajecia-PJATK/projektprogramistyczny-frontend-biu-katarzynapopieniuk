import LoginForm from "../components/LoginForm";

export default function LoginPage({languageVersion, accounts, setLoggetUserEmail}) {
    return <div><LoginForm languageVersion={languageVersion} accounts={accounts} setLoggetUserEmail={setLoggetUserEmail}/></div>
}