import LoginForm from "../components/LoginForm";

export default function LoginPage({languageVersion, accounts, setLoggetUserEmail}) {
    return <div className="p-4 sm:ml-64"><LoginForm languageVersion={languageVersion} accounts={accounts} setLoggetUserEmail={setLoggetUserEmail}/></div>
}