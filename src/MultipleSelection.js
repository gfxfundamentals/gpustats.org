import React from 'react';

export default function MultipleSelection(props) {
  const {id, items, selectedItems, onSelect} = props;
  return (
    <React.Fragment>
    {
      items.map((item, i) => {
        const itemId = `item-${id}-${i}`;
        const checked = selectedItems.has(item);
        return (
          <div key={itemId} className="radio">
            <input
              type="checkbox"
              name={id}
              id={itemId}
              value={item}
              checked={checked}
              onChange={(e) => onSelect(item)}
            />
            <label htmlFor={itemId}>{item}</label>
          </div>
        );
      })
    }
    </React.Fragment>
  );
}
