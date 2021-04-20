import React from 'react';

export default function ExclusiveSelection(props) {
  const {id, items, currentItem, currentIndex, onSelect} = props;
  return (
    <React.Fragment>
    {
      items.map((item, i) => {
        const itemId = `item-${id}-${i}`;
        const checked = item === currentItem || i === currentIndex;
        return (
          <div key={itemId} className="radio">
            <input
              type="radio"
              name={id}
              id={itemId}
              value={item}
              checked={checked}
              onClick={() => onSelect(item, i)}
              onChange={_ => _}
            />
            <label htmlFor={itemId}>{item}</label>
          </div>
        );
      })
    }
    </React.Fragment>
  );
}
