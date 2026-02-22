import { memo } from 'react';
import type { DataGridProps } from '../../interfaces/index';
import DataGrid, { Column, Paging, Pager, Toolbar, Item, HeaderFilter } from "devextreme-react/data-grid";


function AppDataGrid({
    data,
    columns,
    keyExpr,
    toolbarItems,
    repaintChangesOnly
}: DataGridProps) {
    return (
        <DataGrid
        dataSource={data}
        keyExpr={keyExpr}
        repaintChangesOnly={repaintChangesOnly}
        showBorders={true}
        columnAutoWidth={true}
        >
        <HeaderFilter visible={true} />
        {toolbarItems && ( // Conditionally render toolbar if items are provided
            <Toolbar>
                {toolbarItems?.map((item, i) => (
                    <Item key={i} {...item} />
                ))}
            </Toolbar>
        )}
        <Paging defaultPageSize={10} />
        <Pager
            showPageSizeSelector={true}
            allowedPageSizes={[5, 10, 20]}
            showInfo={true}
        />

        {columns.map((col, index) => (
            <Column 
                key={index} 
                {...col}
            />
        ))}
        </DataGrid>
    );
}

export default memo(AppDataGrid);