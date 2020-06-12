import * as React from 'react';
import Cell from './Cell';
import Button from '@material-ui/core/Button';
import './DataTable.scss';

export default class DataTable extends React.Component {
  constructor(props){
    super(props);

    this.renderHeadingRow = this.renderHeadingRow.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  onClickHandler = (index) => {
    if (this.props.isSearch){
      console.log('adding song at index', index);
    } else {
      console.log('deleting song at index', index);
    }
  };

  renderHeadingRow = (_cell, cellIndex) => {
    const {headings} = this.props;

    return (
      <Cell
        key={`heading-${cellIndex}`}
        content={headings[cellIndex]}
        header={true}
        headerKey={headings[cellIndex]}
      />
    )
  };
  
  renderRow = (_row, rowIndex) => {
    const {rows, isSearch} = this.props;

    return (
      <tr key={`row-${rowIndex}`}>
        {rows[rowIndex].map((_cell, cellIndex) => {
          return (
            <Cell
              key={`${rowIndex}-${cellIndex}`}
              content={rows[rowIndex][cellIndex]}
            />
          )
        })}
        <Button variant='contained' color={`${isSearch ? "primary " : "secondary"}`} onClick={() => this.onClickHandler(rowIndex)}>
          {isSearch ?  "Add Song" : "Delete Song"}
        </Button>
      </tr>
    )
  };

  render() {
    const {headings, rows} = this.props;

    const theadMarkup = (
      <tr key="heading">
        {headings.map(this.renderHeadingRow)}
      </tr>
    );

    const tbodyMarkup = rows.map(this.renderRow);
  
    return (
      <table className="Table">
        <thead>{theadMarkup}</thead>
        <tbody>{tbodyMarkup}</tbody>
      </table>
    );
  }
}