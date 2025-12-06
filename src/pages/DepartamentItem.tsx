import { Link } from 'react-router'
import DataGridComponent from '../features/datagrid/DataGridComponent'


export function DepartamentItem() {
    return (
        <div>
            <h1>Current budget</h1>
            <Link to={'/department'}>Back to department</Link>
            <DataGridComponent />
        </div>
    )

}