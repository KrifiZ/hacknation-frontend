import { DepartamentPutPipe } from "../pipes/departament.pipe"

const IP = '10.250.193.124'

export async function getDepartmentItems(dept: string) {
    const res = await fetch(`http://${IP}:8080/api/budget-items/departments/${dept}`, { method: 'GET' })
    const json = await res.json()
    console.log(json)
    console.log(JSON.stringify(json))
    return json
}

export async function getDepartamentHistory(dept: string) {
    const res = await fetch(`http://${IP}:8080/api/budget-items/departments/${dept}/history`, { method: 'GET' })
    const json = await res.json()
    return json
}

// export async function get

export async function getBBFItems() {
    const res = await fetch(`http://${IP}:8080/api/budget-items`, { method: 'GET'})
    const json = await res.json()
    console.log(JSON.stringify(json))
    return json
}

export async function updateDepartmentItem(itemId: number, body: unknown) {
    const res = await fetch(`http://${IP}:8080/api/budget-items/${itemId}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return res
}

export async function postEmptyRow(dept: string) {
    const res = await fetch(`http://${IP}:8080/api/budget-items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"departmentId": dept})
    })
    return res
}

export async function putRow({ rowData, rowId }: { rowData: unknown[]; rowId: number }) {
    const b = JSON.stringify(DepartamentPutPipe(rowData || [], rowId));
    console.log("AFTER UNPIPE STRINGIFY\n", b, "\n\nAFTER STRINGIFY");

    const res = await fetch(`http://${IP}:8080/api/budget-items/${rowData[0]}`, {
        method: 'PUT',
        body: b,
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return res
}