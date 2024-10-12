import Dashboard from "./App";
import { cookies } from 'next/headers';

export default function Home() {
    const cookieStore = cookies();
    const userCookie = cookieStore.get('user')?.value;

    let user = null;

    if (userCookie) {
        user = JSON.parse(userCookie);
    }
    return (
        <div>
            <Dashboard user={user} />
        </div>
    );
}
