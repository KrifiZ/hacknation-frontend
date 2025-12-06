import { Link } from 'react-router'

export function DepartamentItems(){
    return (
        <div>
            <h1>Items</h1>
            <div>
                <Link to={'/department/items/item'}>Current budget</Link>
            </div>
        </div>
    )
}
