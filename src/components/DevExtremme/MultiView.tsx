import React, { memo } from 'react';
import type { MultiViewProps } from '../../interfaces/index';
import { MultiView } from 'devextreme-react/multi-view';

function MultiViewComponent({
  children,
  selectedIndex = 0, // Por defecto, la primera vista
  onSelectionChanged,
  animationEnabled = true,
  swipeEnabled = true,
}: MultiViewProps) {
  const dataSource = React.Children.toArray(children);

  const ItemComponent = (item: any) => {
    return <>{item.data}</>;
  };

  return (
    <MultiView
      dataSource={dataSource}
      itemComponent={ItemComponent}
      selectedIndex={selectedIndex}
      onSelectionChanged={onSelectionChanged}
      animationEnabled={animationEnabled}
      swipeEnabled={swipeEnabled}
    />
  );
};

export default memo(MultiViewComponent);
