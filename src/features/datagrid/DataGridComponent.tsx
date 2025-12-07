import 'react-data-grid/lib/styles.css';
import 'handsontable/styles/handsontable.min.css';
import 'handsontable/styles/ht-theme-main.min.css';
import 'handsontable/styles/handsontable.css';
import 'handsontable/styles/ht-theme-main.css';
import 'handsontable/styles/ht-theme-horizon.css';

import Handsontable from 'handsontable/base';
import { registerAllModules } from 'handsontable/registry';
import { HotTable } from '@handsontable/react-wrapper';
import type { HotTableRef } from '@handsontable/react-wrapper'

import { DataColumns } from './view-model/data-grid-view.model'
import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getDepartmentItems, postEmptyRow, putRow } from '../../shared/utils/api';
import { DepartamentPipe } from '../../shared/utils/pipes/departament.pipe';

registerAllModules();

// const pickOne = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
// const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// function generateDummyRow(rowIndex: number): Handsontable.CellValue[] {
//   return DataColumns.map((c, colIndex) => {
//     if (c.type === 'numeric') {
//       const bigAmount = /(Kwota|Potrzeby|Limit)/i.test(c.header);
//       return bigAmount ? randInt(10_000, 5_000_000) : randInt(1, 999);
//     }

//     if (c.header === 'Grupa wydatków') return pickOne(['Inwestycje', 'Operacyjne', 'Utrzymanie', 'Inne']);
//     if (c.header.startsWith('Budżet zadaniowy')) return pickOne(['F1-Z1', 'F2-Z3', 'F3-Z2', 'F4-Z4']);
//     if (c.header === 'Nazwa programu/projektu') return `Projekt ${rowIndex + 1}`;
//     if (c.header === 'Nazwa komórki organizacyjnej') return pickOne(['Biuro IT', 'Wydział A', 'Wydział B', 'Zespół Analiz']);
//     if (c.header === 'Plan WI') return `Plan WI ${2026 + (rowIndex % 4)}`;
//     if (c.header === 'Dysponent środków') return pickOne(['MC', 'COI', 'KPRM']);
//     if (c.header === 'Budżet') return pickOne(['Centralny', 'Zadaniowy', 'Jednostkowy']);
//     if (c.header === 'Nazwa zadania') return `Zadanie ${rowIndex + 1}`;
//     if (c.header.startsWith('Szczegółowe uzasadnienie')) return `Uzasadnienie dla zadania ${rowIndex + 1}`;
//     if (c.header.includes('Nr umowy')) return `UM/${2026 + (rowIndex % 4)}/${randInt(100, 999)}`;
//     if (c.header.startsWith('W przypadku dotacji')) return pickOne(['Firma X', 'Instytut Y', 'Stowarzyszenie Z']);
//     if (c.header === 'Podstawa prawna udzielenia dotacji') return pickOne(['Ustawa ABC art. 10', 'Uchwała 12/2025', 'Rozporządzenie XYZ']);
//     if (c.header === 'Uwagi') return pickOne(['', 'Do weryfikacji', 'Pilne', '']);

//     return `Tekst ${rowIndex + 1}.${colIndex + 1}`;
//   });
// }

export function DataGridComponent({ canEdit=true, dataRows }: { canEdit?: boolean, dataRows?: Handsontable.CellValue[][] }) {
  const tableRef = useRef<HotTableRef | null>(null);
  const deptId = '1';
  const dept = '1';

  const [gridData, _setData] = useState<Handsontable.CellValue[][]>(dataRows ?? []);
  const [fixedColumns, setFixedColumns] = useState(4);
  // const [rowIndex, setRowIndex] = useState(0);

  const res = useMutation({mutationFn: () => postEmptyRow(dept)})
  const post = useMutation({mutationFn: putRow})
  const reloadData = useMutation({mutationFn: () => getDepartmentItems(deptId)})

  useEffect(() => {
    const a = () => {
      setFixedColumns(window.innerWidth < 1280 ? 0 : 4);
      const hot = tableRef.current?.hotInstance as Handsontable | undefined;
      hot?.updateSettings({
        fixedColumnsStart: fixedColumns
      })
    }
    window.addEventListener('resize', a);
    return () => {
      window.removeEventListener('resize', a)
    }
  })

  useEffect(() => {
    if (tableRef.current) {
      const hot = tableRef.current?.hotInstance as Handsontable | undefined;
      hot?.render()
    }
  }, [dataRows])

  const buttonClickCallback = () => {
    const hot = tableRef.current?.hotInstance as Handsontable | undefined;
    const exportPlugin = hot?.getPlugin('exportFile');

    exportPlugin?.downloadFile('csv', {
      bom: false,
      columnDelimiter: ',',
      columnHeaders: true,
      exportHiddenColumns: true,
      exportHiddenRows: true,
      fileExtension: 'csv',
      filename: 'Plan-Budzetowy-[Departament]-[Stage]-_[YYYY]-[MM]-[DD]@[HH]:[mm]',
      mimeType: 'text/csv',
      rowDelimiter: '\r\n',
      rowHeaders: false,
    });
  };

  const send = (rowId: number) => {
    const hot = tableRef.current?.hotInstance as Handsontable | undefined;
    const rowData = hot?.getDataAtRow(rowId);
    post.mutate({rowData: rowData || [], rowId});
    
    reloadData.mutateAsync().then((newData) => {
      if (newData) {
        console.log("NEW DATA\n", newData);
        _setData(DepartamentPipe(newData));
        hot?.loadData(gridData);
      }
    }).catch((err) => {
      console.log(err);
    });
    setTimeout(() => {}, 1500);
    hot?.render();
  }

  const addRow = (e: React.MouseEvent<HTMLButtonElement>) => {
    const hot = tableRef.current?.hotInstance as Handsontable | undefined;
    e.preventDefault();
    // if(gridData) {
    //   setRowIndex(gridData.length);
    // }
    res.mutate();
    reloadData.mutateAsync().then((newData) => {
      if (newData) {
        console.log("NEW DATA\n", newData);
        _setData(DepartamentPipe(newData));
        hot?.render();
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <div className='data-grid m-2 p-2 border-gray-200 border-2 bg-gray-50 flex flex-col space-y-2 rounded-xl'>
      <div className="">
        <button className='border-2 border-gray-300 p-2 bg-gray-100 rounded-md cursor-pointer hover:opacity-80' onClick={() => buttonClickCallback()}>
          Eksportuj
        </button>
      </div>
      <HotTable
        ref={tableRef}
        themeName="ht-theme-main"
        data={gridData}
        colHeaders = {DataColumns.map(c => c.header)}
        rowHeaders={false}
        height="auto"
        autoWrapRow={true}
        autoWrapCol={true}
        fixedColumnsStart={fixedColumns}
        fillHandle={false}
        selectionMode='single'
        columns={DataColumns.map(c => {
          const validatorsByHeader: Record<string, (value: Handsontable.CellValue, cb: (isValid: boolean) => void) => void> = {
            'Część budżetowa': (value, cb) => cb(value === '' || value === null ? true : /^\d{2}$/.test(String(value))),
            'Dział': (value, cb) => cb(value === '' || value === null ? true : /^\d{3}$/.test(String(value))),
            'Rozdział': (value, cb) => cb(value === '' || value === null ? true : /^\d{5}$/.test(String(value))),
            'Paragraf': (value, cb) => cb(value === '' || value === null ? true : /^\d{3}$/.test(String(value))),
            'Źródło finansowania': (value, cb) => cb(value === '' || value === null ? true : /^\d{1}$/.test(String(value))),
            'Budżet zadaniowy (w pełnej szczegółowości)': (value, cb) =>
              cb(value === '' || value === null ? true : /^\d{2}\.\d{2}\.\d{2}\.\d{2}$/.test(String(value))),
          };

          const numericFallbackValidator = (value: Handsontable.CellValue, callback: (isValid: boolean) => void) => {
            if (value === null || value === '') {
              callback(true);
              return;
            }
            const isValid = !isNaN(Number(value));
            callback(isValid);
          };

          return {
            editor: canEdit && c.header == 'Nazwa komórki organizacyjnej' ? false : canEdit ? c.type : false,
            validator:
              validatorsByHeader[c.header]
                ? validatorsByHeader[c.header]
                : c.type === 'numeric'
                  ? numericFallbackValidator
                  : undefined
          };
        })}
        // columns={DataColumns.map(c => (
        //   { 
        //     editor: canEdit && c.header == 'Nazwa komórki organizacyjnej' ? false : c.type,
        //     validator: c.type === 'numeric' ? (value: Handsontable.CellValue, callback: (isValid: boolean) => void) => {
        //       if (value === null || value === '') {
        //         callback(true);
        //         return;
        //       }
        //       const isValid = !isNaN(Number(value));
        //       callback(isValid);
        //     } : undefined
        //   }
        // ))}
        afterChange={(changes) => {
          // const hot = tableRef.current?.hotInstance as Handsontable | undefined;
          console.log("CHANGES\n", changes);
          if(changes) send(changes[0][0]);
        }}
        afterValidate={() => {
          // clearInterval()
        }}
        afterBeginEditing={(row, column) => {
          setInterval(() => {

          }, 2000)
          console.log(row, column)
          // if (tableRef.current) {
          //   const hot = tableRef.current?.hotInstance as Handsontable | undefined
          //   hot?.deselectCell()
          //   type CellMeta = { readOnly?: boolean }
          //   const dedisable = (hot?.getCellsMeta() ?? []) as CellMeta[]
          //   console.log(dedisable)
          //   dedisable.forEach((cell) => { cell.readOnly = false })
          //   const cellMetaAtRow = (hot?.getCellMetaAtRow(row) ?? []) as CellMeta[]
          //   console.log(cellMetaAtRow)
          //   cellMetaAtRow.forEach((cell) => { cell.readOnly = true })
          //   hot?.render();
          // }
        }}
        licenseKey="non-commercial-and-evaluation"
      />
      {canEdit ? <button onClick={addRow} className='bg-blue-500 text-white p-2 rounded-md'>Add Row</button> : null}
    </div>

  )
}

export default DataGridComponent