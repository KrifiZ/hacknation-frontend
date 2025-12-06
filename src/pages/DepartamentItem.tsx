import { Link } from 'react-router'
import 'react-data-grid/lib/styles.css';
import { DataGrid, type Column } from 'react-data-grid';

interface Row {
  id: number;
  title: string;
}

const columns: readonly Column<Row>[] = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title' }
];

const rows: readonly Row[] = [
  { id: 0, title: 'Example' },
  { id: 1, title: 'Demo' }
];

export function DepartamentItem() {


    return (
        <div>
            <h1>Current budget</h1>
            <Link to={'/department'}>Back to department</Link>
            <DataGrid columns={columns} rows={rows} />
        </div>
    )

}