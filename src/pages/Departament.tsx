import { Link } from 'react-router'

export function Departament() {
    const mockDepName = 'Department A'
    return (
        <div>
            <h1>{mockDepName}</h1>
            <div>
                <Link to={'/department/items'}>Budgets</Link>
            </div>
        </div>
    )
}